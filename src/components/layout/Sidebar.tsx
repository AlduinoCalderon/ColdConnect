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
  People as UsersIcon,
  Storage as StorageUnitIcon,
  Payment as PaymentIcon,
  Build as MaintenanceIcon,
  Notifications as NotificationIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Language as LanguageIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { RootState } from '../../store/store';

const drawerWidth = '15rem';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    marginTop: '64px', // Altura de la Navbar
    height: 'calc(100% - 64px)', // Altura total menos la altura de la Navbar
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.primary.contrastText,
  position: 'fixed',
  top: 16,
  left: 16,
  zIndex: 1301,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  zIndex: theme.zIndex.drawer + 2,
  boxShadow: 'none',
}));

const navigationItems = [
  { path: '/', icon: <HomeIcon />, translationKey: 'navigation.home' },
  { path: '/warehouses', icon: <WarehouseIcon />, translationKey: 'navigation.warehouses' },
  { path: '/nearby-warehouses', icon: <LocationIcon />, translationKey: 'navigation.nearbyWarehouses' },
  { path: '/storage-units', icon: <StorageUnitIcon />, translationKey: 'navigation.storageUnits' },
  { path: '/bookings', icon: <BookingIcon />, translationKey: 'navigation.bookings' },
  { path: '/payments', icon: <PaymentIcon />, translationKey: 'navigation.payments' },
  { path: '/users', icon: <UsersIcon />, translationKey: 'navigation.users' },
  { path: '/sensors', icon: <SensorsIcon />, translationKey: 'navigation.sensors' },
  { path: '/settings', icon: <SettingsIcon />, translationKey: 'navigation.settings' },
  { path: '/profile', icon: <ProfileIcon />, translationKey: 'navigation.profile' },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n: i18nInstance } = useTranslation();
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLanguageChange = () => {
    const currentLang = i18nInstance.language;
    let newLang;
    switch (currentLang) {
      case 'en':
        newLang = 'es';
        break;
      case 'es':
        newLang = 'ja';
        break;
      case 'ja':
        newLang = 'en';
        break;
      default:
        newLang = 'en';
    }
    i18nInstance.changeLanguage(newLang);
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <MenuButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </MenuButton>
      </StyledAppBar>
      <StyledDrawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
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
          <ListItem button onClick={handleThemeToggle}>
            <ListItemIcon>
              {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </ListItemIcon>
            <ListItemText primary={themeMode === 'light' ? t('settings.darkMode') : t('settings.lightMode')} />
          </ListItem>
          <ListItem button onClick={handleLanguageChange}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary={t('settings.language')} />
          </ListItem>
        </List>
      </StyledDrawer>
    </>
  );
};

export default Sidebar;
