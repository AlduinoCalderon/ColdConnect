import React from 'react';
import {
  TextField,
  MenuItem,
  Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Warehouse } from '../../services/warehouseService';
import { useTranslation } from 'react-i18next';

interface WarehouseFormProps {
  warehouse?: Warehouse;
  onSubmit: (data: Omit<Warehouse, 'warehouseId' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => void;
}

interface FieldProps {
  field: {
    value: any;
    onChange: (value: any) => void;
    name: string;
  };
}

const WarehouseForm: React.FC<WarehouseFormProps> = ({ warehouse, onSubmit }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, formState: { errors } } = useForm<Warehouse>({
    defaultValues: warehouse || {
      name: '',
      ownerId: 0,
      status: 'active',
      location: {
        x: 0,
        y: 0
      },
      address: '',
      operatingHours: {
        weekdays: [
          { day: 'Monday', open: '09:00', close: '18:00' },
          { day: 'Tuesday', open: '09:00', close: '18:00' },
          { day: 'Wednesday', open: '09:00', close: '18:00' },
          { day: 'Thursday', open: '09:00', close: '18:00' },
          { day: 'Friday', open: '09:00', close: '18:00' },
          { day: 'Saturday', open: '09:00', close: '14:00' },
          { day: 'Sunday', open: '09:00', close: '14:00' }
        ]
      },
      amenities: []
    }
  });

  const onSubmitForm = (data: Warehouse) => {
    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmitForm)} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }: FieldProps) => (
              <TextField
                {...field}
                fullWidth
                label={t('warehouse.name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="status"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }: FieldProps) => (
              <TextField
                {...field}
                select
                fullWidth
                label={t('warehouse.status')}
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                <MenuItem value="active">{t('warehouse.statusTypes.active')}</MenuItem>
                <MenuItem value="maintenance">{t('warehouse.statusTypes.maintenance')}</MenuItem>
                <MenuItem value="closed">{t('warehouse.statusTypes.closed')}</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="address"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }: FieldProps) => (
              <TextField
                {...field}
                fullWidth
                label={t('warehouse.address')}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="location.x"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }: FieldProps) => (
              <TextField
                {...field}
                type="number"
                label={t('warehouse.latitude')}
                error={!!errors.location?.x}
                helperText={errors.location?.x?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="location.y"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }: FieldProps) => (
              <TextField
                {...field}
                type="number"
                label={t('warehouse.longitude')}
                error={!!errors.location?.y}
                helperText={errors.location?.y?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            {t('warehouse.operatingHours')}
          </Typography>
          <Grid container spacing={2}>
            {warehouse?.operatingHours?.weekdays?.map((day, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Controller
                    name={`operatingHours.weekdays.${index}.open`}
                    control={control}
                    rules={{ required: t('validation.required') }}
                    render={({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        type="time"
                        label={t(`days.${day.day.toLowerCase()}`)}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.operatingHours?.weekdays?.[index]?.open}
                        helperText={errors.operatingHours?.weekdays?.[index]?.open?.message}
                      />
                    )}
                  />
                  <Controller
                    name={`operatingHours.weekdays.${index}.close`}
                    control={control}
                    rules={{ required: t('validation.required') }}
                    render={({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        type="time"
                        label={t('warehouse.close')}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.operatingHours?.weekdays?.[index]?.close}
                        helperText={errors.operatingHours?.weekdays?.[index]?.close?.message}
                      />
                    )}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {warehouse ? t('common.save') : t('common.create')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WarehouseForm; 