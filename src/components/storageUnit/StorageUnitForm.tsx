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
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const statusOptions = [
    { value: 'available', label: t('storageUnit.status.available') },
    { value: 'occupied', label: t('storageUnit.status.occupied') },
    { value: 'maintenance', label: t('storageUnit.status.maintenance') },
    { value: 'reserved', label: t('storageUnit.status.reserved') },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? t('storageUnit.edit') : t('storageUnit.add')}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                    label={t('storageUnit.name')}
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
                    label={t('storageUnit.warehouse')}
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
                    label={t('storageUnit.width')}
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
                    label={t('storageUnit.height')}
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
                    label={t('storageUnit.depth')}
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
                rules={{ required: t('validation.required') }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('storageUnit.minTemp')}
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
                rules={{ required: t('validation.required') }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('storageUnit.maxTemp')}
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
                rules={{ required: t('validation.required') }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('storageUnit.minHumidity')}
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
                rules={{ required: t('validation.required') }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('storageUnit.maxHumidity')}
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
                    label={t('storageUnit.costPerHour')}
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
                    label={t('storageUnit.status')}
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
          <Button onClick={handleClose}>{t('common.cancel')}</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? t('common.save') : t('common.create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StorageUnitForm; 