import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Box,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { StorageUnit } from '../../types';
import { useTranslation } from 'react-i18next';
import { Warehouse } from '../../types';

interface StorageUnitFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<StorageUnit, 'unitId' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => void;
  warehouses: Warehouse[];
  initialData?: StorageUnit;
}

const StorageUnitForm: React.FC<StorageUnitFormProps> = ({
  open,
  onClose,
  onSubmit,
  warehouses,
  initialData,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: initialData || {
      name: '',
      warehouseId: 0,
      width: 0,
      height: 0,
      depth: 0,
      minTemp: 0,
      maxTemp: 0,
      minHumidity: 0,
      maxHumidity: 0,
      costPerHour: 0,
      status: 'available',
    },
    mode: 'onChange',
  });

  const validateTemperature = (value: number, allValues: any) => {
    if (allValues.minTemp >= allValues.maxTemp) {
      return t('validation.minTempLessThanMaxTemp');
    }
    return true;
  };

  const validateHumidity = (value: number, allValues: any) => {
    if (allValues.minHumidity >= allValues.maxHumidity) {
      return t('validation.minHumidityLessThanMaxHumidity');
    }
    return true;
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const statusOptions = [
    { value: 'available', label: t('Available') },
    { value: 'occupied', label: t('Occupied') },
    { value: 'maintenance', label: t('Maintenance') },
    { value: 'reserved', label: t('Reserved') },
  ];

  const handleSubmitForm = (
    data: Omit<StorageUnit, 'unitId' | 'createdAt' | 'updatedAt' | 'deletedAt'>
  ) => {
  
    console.log('Submitting data:', data);
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? t('New Storage Unit') : t('Add New Storage Unit')}
      </DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: t('validation.required') }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label={t('New Storage Unit Name')}
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="warehouseId"
                control={control}
                rules={{ required: t('validation.required') }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    select
                    label={t('Associated Warehouse')}
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  >
                    {warehouses.map((warehouse) => (
                      <MenuItem key={warehouse.warehouseId} value={warehouse.warehouseId}>
                        {warehouse.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="width"
                control={control}
                rules={{ required: t('validation.required'), min: 0 }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('Storage Unit Width')}
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="height"
                control={control}
                rules={{ required: t('validation.required'), min: 0 }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('Storage Unit Height')}
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="depth"
                control={control}
                rules={{ required: t('validation.required'), min: 0 }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('Storage Unit Depth')}
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="minTemp"
                control={control}
                rules={{ 
                  required: t('validation.required'),
                  validate: validateTemperature
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('Minimum Temperature')}
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="maxTemp"
                control={control}
                rules={{ 
                  required: t('validation.required'),
                  validate: validateTemperature
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('Maximum Temperature')}
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="minHumidity"
                control={control}
                rules={{ 
                  required: t('validation.required'),
                  validate: validateHumidity
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('Minimum Humidity')}
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="maxHumidity"
                control={control}
                rules={{ 
                  required: t('validation.required'),
                  validate: validateHumidity
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('Maximum Humidity')}
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="costPerHour"
                control={control}
                rules={{ required: t('validation.required'), min: 0 }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('Cost Per Hour')}
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="status"
                control={control}
                rules={{ required: t('validation.required') }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    select
                    label={t('Storage Unit Status')}
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('Cancel')}</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? t('common.save') : t('common.create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StorageUnitForm; 