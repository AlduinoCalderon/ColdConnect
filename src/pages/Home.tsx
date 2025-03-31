import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  Warehouse as WarehouseIcon,
  EventNote as BookingIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, p: 3, position: 'relative' }}>
      <Typography variant="h4" gutterBottom>
        {t('common.welcome')}
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('warehouse.title')}
            value="12"
            icon={<WarehouseIcon sx={{ color: 'white' }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('booking.title')}
            value="45"
            icon={<BookingIcon sx={{ color: 'white' }} />}
            color={theme.palette.secondary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Occupancy Rate"
            value="85%"
            icon={<TrendingUpIcon sx={{ color: 'white' }} />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Alerts"
            value="3"
            icon={<WarningIcon sx={{ color: 'white' }} />}
            color="#f44336"
          />
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box sx={{ mt: 2 }}>
              {/* Placeholder for activity list */}
              <Typography color="text.secondary">
                Activity list will be displayed here
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Temperature Overview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Temperature Overview
            </Typography>
            <Box sx={{ mt: 2 }}>
              {/* Placeholder for temperature chart */}
              <Typography color="text.secondary">
                Temperature chart will be displayed here
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home; 