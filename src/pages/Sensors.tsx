import React from 'react';
import { Box, Typography, Paper, Grid, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Sensors: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('navigation.sensors')}
      </Typography>

      <Grid container spacing={3}>
        {/* Temperature Overview */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              {t('dashboard.temperatureOverview')}
            </Typography>
            <Box sx={{ mt: 2, height: '500px', width: '100%' }} style={{ 
              background: theme.palette.mode === 'dark' ? '#121212' : '#FFFFFF',
            }}>
              <iframe 
                style={{ 
                  border: 'none',
                  borderRadius: '2px',
                  boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                  width: '100%',
                  height: '100%'
                }} 
                src={`https://charts.mongodb.com/charts-project-0-esjksfr/embed/charts?id=12f79464-0622-4701-9cb1-25fabc6eb583&maxDataAge=300&theme=${theme.palette.mode === 'dark' ? 'dark' : 'light'}&autoRefresh=true`}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sensors; 