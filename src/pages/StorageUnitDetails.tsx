import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
} from '@mui/material';
import { StorageUnit } from '../types';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { storageUnitService } from '../services/storageUnitService'; 
import StorageIcon from '@mui/icons-material/Storage';

declare global {
  interface Window {
    initShelfViewer: (containerId: string, options: any) => any;
  }
}

const StorageUnitDetails: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [storageUnit, setStorageUnit] = useState<StorageUnit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStorageUnit = async () => {
      try {
        const unit = await storageUnitService.getById(parseInt(id ?? '0')); 
        setStorageUnit(unit);
      } catch (err) {
        console.error('Error fetching storage unit:', err);
        setError(t('storageUnit.error.fetch'));
      } finally {
        setLoading(false);
      }
    };

    fetchStorageUnit();
  }, [id, t]);

  useEffect(() => {
    // Load the viewer script
    const script = document.createElement('script');
    script.src = 'https://3dvisualizer-coral.vercel.app/main.js';
    script.async = true;
    script.onload = () => {
      // Initialize the viewer once the script is loaded
      if (window.initShelfViewer) {
        window.initShelfViewer('shelf-viewer-container', {
          width: '100%',
          height: '400px',
          models: [
            { 
              name: 'Estante', 
              path: 'https://3dvisualizer-coral.vercel.app/models/Shelf.obj' 
            }
          ]
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verificar el origen del mensaje por seguridad
      if (event.origin !== "https://3dvisualizer-embedded.vercel.app") return;

      const { type, data } = event.data;
      
      switch (type) {
        case 'ready':
          console.log('Visualizador listo');
          break;
        case 'sensorUpdate':
          console.log('Actualización de sensor:', data);
          break;
        default:
          console.log('Mensaje recibido:', event.data);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  if (loading) {
    return <Typography variant="h6">{t('Loading...')}</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  if (!storageUnit) {
    return <Typography variant="h6">{t('No storage unit found.')}</Typography>;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('Storage Unit Details')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">{t('Unit Name')}: {storageUnit.name}</Typography>
          <Typography variant="body1">{t('Dimensions')}: {storageUnit.width}m × {storageUnit.height}m × {storageUnit.depth}m</Typography>
          <Typography variant="body1">{t('Temperature')}: {storageUnit.minTemp}°C - {storageUnit.maxTemp}°C</Typography>
          <Typography variant="body1">{t('Humidity')}: {storageUnit.minHumidity}% - {storageUnit.maxHumidity}%</Typography>
          <Typography variant="body1">{t('Cost')}: ${storageUnit.costPerHour}/hr</Typography>
          <Typography variant="body1">{t('Status')}: {storageUnit.status}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ 
            width: '100%', 
            height: '400px', 
            border: '1px solid #ccc',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <iframe
              src="https://3dvisualizer-embedded.vercel.app"
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              title="3D Storage Unit Visualizer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={() => {/* Handle edit action */}}>
          {t('Edit')}
        </Button>
        <Button variant="contained" color="error" onClick={() => {/* Handle delete action */}} sx={{ ml: 2 }}>
          {t('Delete')}
        </Button>
      </Box>
    </Paper>
  );
};

export default StorageUnitDetails;
