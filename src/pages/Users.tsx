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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useTheme,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { User } from '../types';
import { userService } from '../services/userService';

const Users: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [users, setUsers] = useState<User[]>([]);   //longitud dada por Use
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(t('user.error.fetch'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = () => {
    setSelectedUser(null);
    setOpenDialog(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await userService.delete(id);
      setUsers(users.filter(u => u.userId !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(t('user.error.delete'));
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'owner':
        return 'warning';
      case 'customer':
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          {t('user.title')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          {t('user.add')}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white }}>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('user.name')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('user.email')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('user.phone')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('user.role')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('user.status')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }} align="right">{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow 
                key={user.userId}
                sx={{ 
                  backgroundColor: index % 2 === 0 ? theme.palette.action.hover : theme.palette.background.paper,
                  '&:hover': { backgroundColor: theme.palette.action.selected }
                }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone || '-'}</TableCell>
                <TableCell>
                  <Box 
                    sx={{ 
                      display: 'inline-block',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: 
                        user.role === 'admin' ? theme.palette.error.light :
                        user.role === 'owner' ? theme.palette.warning.light :
                        theme.palette.info.light,
                      //color: 
                        //user.role === 'admin' ? theme.palette.error.dark :
                        //user.role === 'owner' ? theme.palette.warning.dark :
                        //theme.palette.info.dark,
                      textTransform: 'capitalize',
                      fontWeight: 'medium'
                    }}
                  >
                    {t(`user.roles.${user.role}`)}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box 
                    sx={{ 
                      display: 'inline-block',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: 
                        user.status === 'active' ? theme.palette.success.light :
                        user.status === 'inactive' ? theme.palette.grey[300] :
                        theme.palette.error.light,
                      color: 
                        user.status === 'active' ? theme.palette.success.dark :
                        user.status === 'inactive' ? theme.palette.grey[700] :
                        theme.palette.error.dark,
                      textTransform: 'capitalize',
                      fontWeight: 'medium'
                    }}
                  >
                    {t(`user.statusTypes.${user.status}`)}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(user)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(user.userId)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* TODO: Add UserForm dialog component */}
    </Container>
  );
};

export default Users; 