import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Language as LanguageIcon,
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

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLanguageChange = () => {
    const newLang = i18nInstance.language === 'en' ? 'es' : 'en';
    i18nInstance.changeLanguage(newLang);
  };

  return (
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
        
        <Typography
  variant="h6"
  noWrap
  component="div"
  sx={{
    flexGrow: 1, // Keeps the text aligned properly
    marginLeft: { xs: "0px", sm: "240px" }, // Adds left margin 0px on mobile, 240px on larger screen
    transition: "margin-left 0.3s ease-in-out",
  }}
>
  Cold Connect
</Typography>


        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
  );
};

export default Navbar; 