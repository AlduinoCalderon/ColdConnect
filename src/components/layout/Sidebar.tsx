import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import {
  Home as HomeIcon,
  Warehouse as WarehouseIcon,
  EventNote as BookingIcon,
  Sensors as SensorsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    marginTop: 64, // Height of the navbar
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const navigationItems = [
  { path: '/', icon: <HomeIcon />, translationKey: 'navigation.home' },
  { path: '/warehouses', icon: <WarehouseIcon />, translationKey: 'navigation.warehouses' },
  { path: '/bookings', icon: <BookingIcon />, translationKey: 'navigation.bookings' },
  { path: '/sensors', icon: <SensorsIcon />, translationKey: 'navigation.sensors' },
  { path: '/reports', icon: <ReportsIcon />, translationKey: 'navigation.reports' },
  { path: '/settings', icon: <SettingsIcon />, translationKey: 'navigation.settings' },
  { path: '/profile', icon: <ProfileIcon />, translationKey: 'navigation.profile' },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor="left"
    >
      <List>
        {navigationItems.map((item) => (
          <ListItem
            button
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={t(item.translationKey)} />
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar; 