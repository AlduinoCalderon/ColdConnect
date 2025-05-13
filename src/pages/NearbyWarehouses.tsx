import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  Tooltip,
  Slider,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Storage as StorageIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L, { Icon, LeafletMouseEvent } from 'leaflet';
import { warehouseService } from '../services/warehouseService';
import { useTranslation } from 'react-i18next';
import 'leaflet/dist/leaflet.css';

// Corrige el icono por defecto de Leaflet en React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface NearbyWarehouse {
  id: number;
  name: string;
  address: string;
  distance: number;
  costPerHour: number | null;
  availableUnits: number;
  totalUnits: number;
  status: string;
  latitude: number;
  longitude: number;
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  marginBottom: '2rem',
};

const DEFAULT_MAX_DISTANCE = 50;
const MIN_DISTANCE = 5;
const MAX_DISTANCE = 150;
const DEFAULT_CENTER = { latitude: 34.6937, longitude: 135.5023 }; // Osaka

const blueIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const warehouseIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const NearbyWarehouses: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [warehouses, setWarehouses] = useState<NearbyWarehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<NearbyWarehouse | null>(null);
  const [maxDistance, setMaxDistance] = useState<number>(DEFAULT_MAX_DISTANCE);
  const [mapCenter, setMapCenter] = useState<[number, number]>([DEFAULT_CENTER.latitude, DEFAULT_CENTER.longitude]);
  const [pendingDistance, setPendingDistance] = useState<number>(DEFAULT_MAX_DISTANCE);
  const [hoveredWarehouseId, setHoveredWarehouseId] = useState<number | null>(null);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [centralMarkerHovered, setCentralMarkerHovered] = useState(false);

  const getUserLocation = useCallback((): Promise<UserLocation> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve(location);
        },
        (error) => {
          reject(new Error('Unable to retrieve your location'));
        }
      );
    });
  }, []);

  const fetchNearbyWarehouses = useCallback(async (location: UserLocation, maxDistanceKm?: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await warehouseService.getNearby({ ...location, maxDistanceKm });
      if (response && Array.isArray(response.data)) {
        setWarehouses(response.data);
      } else {
        setWarehouses([]);
      }
    } catch (err) {
      console.error('Error fetching nearby warehouses:', err);
      setError(t('error.fetchingWarehouses'));
      setWarehouses([]);
    } finally {
      setLoading(false);
    }
  }, [t]);

  const handleRefreshLocation = useCallback(async () => {
    try {
      setLocationError(null);
      const location = await getUserLocation();
      setUserLocation(location);
      await fetchNearbyWarehouses(location, maxDistance);
    } catch (err) {
      setLocationError(t('error.locationAccess'));
    }
  }, [getUserLocation, fetchNearbyWarehouses, maxDistance, t]);

  useEffect(() => {
    handleRefreshLocation();
    // eslint-disable-next-line
  }, []);

  // Cuando cambia la ubicación del usuario, centra el mapa SOLO si es la primera vez
  useEffect(() => {
    if (userLocation && Number.isFinite(userLocation.latitude) && Number.isFinite(userLocation.longitude)) {
      setMapCenter([userLocation.latitude, userLocation.longitude]);
    }
    // eslint-disable-next-line
  }, [userLocation]);

  // Actualiza almacenes solo cuando cambia el centro por dragend o cambia la distancia
  useEffect(() => {
    fetchNearbyWarehouses({ latitude: mapCenter[0], longitude: mapCenter[1] }, maxDistance);
    // eslint-disable-next-line
  }, [maxDistance]);

  // Handler para dragend del pin central
  const handleCentralMarkerDragEnd = (e: any) => {
    const { lat, lng } = e.target.getLatLng();
    setMapCenter([lat, lng]);
    fetchNearbyWarehouses({ latitude: lat, longitude: lng }, maxDistance);
  };

  // Handler para centrar en la ubicación del dispositivo
  const handleCenterOnDevice = async () => {
    try {
      const location = await getUserLocation();
      setUserLocation(location);
      setMapCenter([location.latitude, location.longitude]);
      fetchNearbyWarehouses({ latitude: location.latitude, longitude: location.longitude }, maxDistance);
    } catch (err) {
      setLocationError(t('error.locationAccess'));
    }
  };

  // Mensaje traducible para el popup del pin central
  const getCentralPopupMessage = () => {
    switch (i18n.language) {
      case 'es':
        return 'Haz clic para buscar almacenes cercanos desde este punto';
      case 'ja':
        return 'この地点から近くの倉庫を検索するにはクリックしてください';
      default:
        return 'Click to search for warehouses near this point';
    }
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio >= 0.7) return 'success';
    if (ratio >= 0.3) return 'warning';
    return 'error';
  };

  const formatPrice = (cost: number | null) => {
    if (cost === null) return t('Not Available');
    return `${cost.toLocaleString()} ¥/hr`;
  };

  // Centra el mapa en la ubicación del usuario
  const MapCenterer = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position, map.getZoom());
    }, [position, map]);
    return null;
  };

  // Componente para escuchar eventos de movimiento del mapa
  const MapEventHandler = () => {
    useMapEvents({
      moveend: (e) => {
        const center = e.target.getCenter();
        setMapCenter([center.lat, center.lng]);
      },
    });
    return null;
  };

  // Loggear almacenes recibidos
  useEffect(() => {
    if (warehouses && warehouses.length > 0) {
      console.log('Almacenes recibidos:', warehouses.map(w => ({ id: w.id, name: w.name, lat: w.latitude, lng: w.longitude })));
    } else {
      console.log('No se recibieron almacenes o la lista está vacía.');
    }
  }, [warehouses]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (locationError) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {locationError}
          <Button onClick={handleRefreshLocation} sx={{ ml: 2 }}>
            {t('Retry')}
          </Button>
        </Alert>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 3 }}>
        <Typography variant="h4">
          {t('Nearby Warehouses')}
        </Typography>
        <Tooltip title={t('Refresh Location')}>
          <IconButton onClick={handleRefreshLocation} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Slider para la distancia máxima */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography gutterBottom>
          {t('Max Distance')}: {pendingDistance} km
        </Typography>
        <Slider
          value={pendingDistance}
          min={MIN_DISTANCE}
          max={MAX_DISTANCE}
          step={1}
          valueLabelDisplay="auto"
          onChange={(_, value) => setPendingDistance(value as number)}
          onChangeCommitted={(_, value) => setMaxDistance(value as number)}
          sx={{ flex: 1 }}
        />
        <Button variant="outlined" onClick={handleCenterOnDevice}>
          {t('Center on my location')}
        </Button>
      </Box>

      {/* Mapa OpenStreetMap */}
      <Paper elevation={3} sx={{ mb: 4 }}>
        <MapContainer
          center={mapCenter}
          zoom={10}
          style={mapContainerStyle}
          scrollWheelZoom={true}
        >
          <MapEventHandler />
          <MapCenterer position={mapCenter} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Pin central draggable y azul */}
          <Marker
            position={mapCenter}
            icon={blueIcon}
            draggable={true}
            eventHandlers={{
              dragend: handleCentralMarkerDragEnd,
              mouseover: () => setCentralMarkerHovered(true),
              mouseout: () => setCentralMarkerHovered(false),
            }}
          >
            {centralMarkerHovered && (
              <Popup>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>{getCentralPopupMessage()}</Typography>
                </Box>
              </Popup>
            )}
          </Marker>
          {/* Marcadores de almacenes */}
          {warehouses
            .filter(w => Number.isFinite(w.latitude) && Number.isFinite(w.longitude))
            .map((warehouse) => (
              <Marker
                key={warehouse.id}
                position={[warehouse.latitude, warehouse.longitude]}
                icon={warehouseIcon}
                eventHandlers={{
                  mouseover: () => setHoveredWarehouseId(warehouse.id),
                  mouseout: () => setHoveredWarehouseId(null),
                  click: () => setSelectedWarehouse(warehouse),
                }}
              >
                {selectedWarehouse && selectedWarehouse.id === warehouse.id && (
                  <Popup>
                    <Box>
                      <Typography variant="subtitle1">{warehouse.name}</Typography>
                      <Typography variant="body2">{warehouse.address}</Typography>
                      <Typography variant="body2">
                        {t('Distance')}: {warehouse.distance.toFixed(1)} km
                      </Typography>
                      <Typography variant="body2">
                        {t('Cost')}: {formatPrice(warehouse.costPerHour)}
                      </Typography>
                    </Box>
                  </Popup>
                )}
              </Marker>
            ))}
        </MapContainer>
      </Paper>

      {warehouses.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          {t('No warehouses found nearby')}
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {warehouses.map((warehouse) => (
            <Grid item xs={12} md={6} lg={4} key={warehouse.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  boxShadow: hoveredWarehouseId === warehouse.id ? 6 : 1,
                  transform: hoveredWarehouseId === warehouse.id ? 'scale(1.05)' : 'scale(1)',
                  zIndex: hoveredWarehouseId === warehouse.id ? 10 : 1,
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {warehouse.name}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {warehouse.address}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {t('Distance')}: {warehouse.distance.toFixed(1)} km
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <StorageIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {t('Cost')}: {formatPrice(warehouse.costPerHour)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={`${warehouse.availableUnits}/${warehouse.totalUnits} ${t('Available')}`}
                      color={getAvailabilityColor(warehouse.availableUnits, warehouse.totalUnits)}
                      size="small"
                    />
                    <Chip
                      label={warehouse.status}
                      color={warehouse.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default NearbyWarehouses; 