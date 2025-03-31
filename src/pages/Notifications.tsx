import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Chip,
  Divider,
} from '@mui/material';
import {
  Notifications as NotificationIcon,
  Warning as AlertIcon,
  Payment as PaymentIcon,
  Build as MaintenanceIcon,
  EventNote as BookingIcon,
  CheckCircle as ReadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Notification } from '../types';
import { notificationService } from '../services/notificationService';

const Notifications: React.FC = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await notificationService.getAll();
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(t('notification.error.fetch'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(notifications.map(n => 
        n.notificationId === id ? { ...n, isRead: true } : n
      ));
    } catch (err) {
      console.error('Error marking notification as read:', err);
      setError(t('notification.error.markAsRead'));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await notificationService.delete(id);
      setNotifications(notifications.filter(n => n.notificationId !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
      setError(t('notification.error.delete'));
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead(1); // TODO: Get actual user ID
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      setError(t('notification.error.markAllAsRead'));
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return <AlertIcon color="error" />;
      case 'payment':
        return <PaymentIcon color="primary" />;
      case 'maintenance':
        return <MaintenanceIcon color="warning" />;
      case 'booking':
        return <BookingIcon color="info" />;
      default:
        return <NotificationIcon />;
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return 'error';
      case 'payment':
        return 'primary';
      case 'maintenance':
        return 'warning';
      case 'booking':
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          {t('notification.title')}
        </Typography>
        {unreadCount > 0 && (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ReadIcon />}
            onClick={handleMarkAllAsRead}
          >
            {t('notification.markAllAsRead')}
          </Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper>
        <List>
          {notifications.map((notification, index) => (
            <React.Fragment key={notification.notificationId}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  backgroundColor: notification.isRead ? 'transparent' : 'action.hover',
                }}
              >
                <ListItemIcon>
                  {getNotificationIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle1">
                        {notification.title}
                      </Typography>
                      <Chip
                        label={t(`notification.types.${notification.type}`)}
                        color={getTypeColor(notification.type)}
                        size="small"
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {notification.message}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{ mt: 1 }}
                      >
                        {new Date(notification.createdAt).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  {!notification.isRead && (
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={() => handleMarkAsRead(notification.notificationId)}
                      sx={{ mr: 1 }}
                    >
                      <ReadIcon />
                    </IconButton>
                  )}
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDelete(notification.notificationId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Notifications; 