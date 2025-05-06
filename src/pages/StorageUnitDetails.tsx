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
import { storageUnitService } from '../services/storageUnitService'; // Ensure this import is correct

const StorageUnitDetails: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL
  const [storageUnit, setStorageUnit] = useState<StorageUnit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStorageUnit = async () => {
        try {
          // If id is undefined, use a default value (like 0 or some other fallback)
          const unit = await storageUnitService.getById(parseInt(id ?? '0')); // Fallback to '0' if id is undefined
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6">{t('Unit Name')}: {storageUnit.name}</Typography>
            <Typography variant="body1">{t('Dimensions')}: {storageUnit.width}m × {storageUnit.height}m × {storageUnit.depth}m</Typography>
            <Typography variant="body1">{t('Temperature')}: {storageUnit.minTemp}°C - {storageUnit.maxTemp}°C</Typography>
            <Typography variant="body1">{t('Humidity')}: {storageUnit.minHumidity}% - {storageUnit.maxHumidity}%</Typography>
            <Typography variant="body1">{t('Cost')}: ${storageUnit.costPerHour}/hr</Typography>
            <Typography variant="body1">{t('Status')}: {storageUnit.status}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={() => {/* Handle edit action */}}>
              {t('Edit')}
            </Button>
            <Button variant="contained" color="error" onClick={() => {/* Handle delete action */}} sx={{ ml: 2 }}>
              {t('Delete')}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            width: '100%', 
            height: '400px', 
            border: '1px solid #ccc',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <iframe
              src="https://3dvisualizer-coral.vercel.app"
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              title="3D Storage Unit Visualizer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StorageUnitDetails;
