import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  styled,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Home as HomeIcon,
  Warehouse as WarehouseIcon,
  EventNote as BookingIcon,
  Sensors as SensorsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  Person as ProfileIcon,
  Menu as MenuIcon,
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
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.primary.contrastText,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
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
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          <MenuButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </MenuButton>
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <Toolbar /> {/* Spacer for AppBar */}
        <List>
          {navigationItems.map((item) => (
            <ListItem
              button
              key={item.path}
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                handleDrawerToggle();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={t(item.translationKey)} />
            </ListItem>
          ))}
        </List>
      </StyledDrawer>
    </>
  );
};

export default Sidebar; 