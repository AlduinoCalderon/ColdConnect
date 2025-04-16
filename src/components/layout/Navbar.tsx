import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Tooltip,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Language as LanguageIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleTheme } from '../../store/slices/themeSlice';
import i18n from '../../i18n/i18n';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t, i18n: i18nInstance } = useTranslation();
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const [notificationCount, setNotificationCount] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<string[]>([]);

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

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const fetchNotifications = async () => {
    const fetchedNotifications = await new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(['Notification 1', 'Notification 2']);
      }, 1000);
    });

    setNotifications(fetchedNotifications);
    setNotificationCount(fetchedNotifications.length);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 2 }}>
        <Toolbar sx={{ minHeight: 64 }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              sx={{ mr: 2 }}
              onClick={() => {/* TODO: Implement mobile menu toggle */}}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: { xs: '0', sm: '240px' },
              transition: 'margin-left 0.3s ease-in-out',
            }}
          >
            <Box
              component="img"
              src="/logo512.png"
              alt="Cold Connect Logo"
              sx={{
                height: 40,
                width: 'auto',
                mr: 2,
                backgroundColor: 'transparent',
              }}
            />
            
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                marginLeft: 0,
              }}
            >
              Cold Connect
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 'auto' }}>
            <Tooltip title={t('notifications.title')}>
              <IconButton
                color="inherit"
                onClick={toggleDrawer(true)}
              >
                <Badge 
                  badgeContent={notificationCount} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      right: -3,
                      top: 13,
                      border: `2px solid ${theme.palette.background.paper}`,
                      padding: '0 4px',
                    },
                  }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title={themeMode === 'light' ? t('settings.darkMode') : t('settings.lightMode')}>
              <IconButton
                color="inherit"
                onClick={handleThemeToggle}
              >
                {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title={`${t('settings.language')} (${i18nInstance.language.toUpperCase()})`}>
              <IconButton
                color="inherit"
                onClick={handleLanguageChange}
              >
                <LanguageIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem>
            <ListItemText primary={t('notifications.title')} />
          </ListItem>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <ListItem 
                key={index}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    transition: 'background-color 0.3s ease',
                  },
                }}
              >
                <ListItemText primary={notification} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary={t('notifications.noNotifications')} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar; 