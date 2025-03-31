import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  SelectChangeEvent,
  IconButton,
  Drawer,
  Toolbar,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleTheme } from '../store/slices/themeSlice';
import MenuIcon from '@mui/icons-material/Menu';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          {t('settings.title')}
        </Typography>
      </Toolbar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            {/* Theme Setting */}
            {/* <ListItem>
              <ListItemText
                primary={t('settings.theme')}
                secondary={t('settings.darkMode')}
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={themeMode === 'dark'}
                  onChange={() => dispatch(toggleTheme())}
                />
              </ListItemSecondaryAction>
            </ListItem> */}

            {/* Language Setting */}
            <ListItem>
              <ListItemText
                primary={t('settings.language')}
                secondary="Select your preferred language"
              />
              <ListItemSecondaryAction>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    value={i18n.language}
                    onChange={handleLanguageChange}
                    size="small"
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Español</MenuItem>
                  </Select>
                </FormControl>
              </ListItemSecondaryAction>
            </ListItem>

            {/* Notifications Setting */}
            <ListItem>
              <ListItemText
                primary={t('settings.notifications')}
                secondary="Enable or disable system notifications"
              />
              <ListItemSecondaryAction>
                <Switch edge="end" defaultChecked />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Paper sx={{ mt: 3 }}>
        <List>
          {/* Theme Setting */}
          {/* <ListItem>
            <ListItemText
              primary={t('settings.theme')}
              secondary={t('settings.darkMode')}
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={themeMode === 'dark'}
                onChange={() => dispatch(toggleTheme())}
              />
            </ListItemSecondaryAction>
          </ListItem> */}

          {/* Language Setting */}
          <ListItem>
            <ListItemText
              primary={t('settings.language')}
              secondary="Select your preferred language"
            />
            <ListItemSecondaryAction>
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  size="small"
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                </Select>
              </FormControl>
            </ListItemSecondaryAction>
          </ListItem>

          {/* Notifications Setting */}
          <ListItem>
            <ListItemText
              primary={t('settings.notifications')}
              secondary="Enable or disable system notifications"
            />
            <ListItemSecondaryAction>
              <Switch edge="end" defaultChecked />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      {/* Theme Preview */}
      <Paper sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Theme Preview
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            Primary
          </Box>
          <Box
            sx={{
              width: 100,
              height: 100,
              backgroundColor: theme.palette.secondary.main,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            Secondary
          </Box>
          <Box
            sx={{
              width: 100,
              height: 100,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 1,
              borderColor: 'divider',
            }}
          >
            Background
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings; 