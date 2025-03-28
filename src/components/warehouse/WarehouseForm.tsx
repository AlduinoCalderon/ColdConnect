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
import * as ReactHookForm from 'react-hook-form';
import { Warehouse } from '../../services/warehouseService';
import { useTranslation } from 'react-i18next';

interface WarehouseFormProps {
  warehouse?: Warehouse | null;
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
  const { control, handleSubmit, formState: { errors } } = ReactHookForm.useForm({
    defaultValues: warehouse || {
      name: '',
      ownerId: 1, // This should come from the authenticated user
      status: 'active',
      location: {
        type: 'Point',
        coordinates: [0, 0],
      },
      address: '',
      operatingHours: {
        monday: { open: '09:00', close: '17:00' },
        tuesday: { open: '09:00', close: '17:00' },
        wednesday: { open: '09:00', close: '17:00' },
        thursday: { open: '09:00', close: '17:00' },
        friday: { open: '09:00', close: '17:00' },
        saturday: { open: '09:00', close: '13:00' },
        sunday: { open: '09:00', close: '13:00' },
      },
      amenities: [],
    },
  });

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const commonAmenities = ['seguridad', 'climatizado', 'carga', 'descarga', 'almacenamiento'];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ReactHookForm.Controller
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
          <ReactHookForm.Controller
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
          <ReactHookForm.Controller
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
          <ReactHookForm.Controller
            name="location.coordinates.0"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }: FieldProps) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label={t('warehouse.latitude')}
                error={!!errors.location?.coordinates?.[0]}
                helperText={errors.location?.coordinates?.[0]?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ReactHookForm.Controller
            name="location.coordinates.1"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }: FieldProps) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label={t('warehouse.longitude')}
                error={!!errors.location?.coordinates?.[1]}
                helperText={errors.location?.coordinates?.[1]?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            {t('warehouse.operatingHours')}
          </Typography>
          <Grid container spacing={2}>
            {days.map((day) => (
              <Grid item xs={12} sm={6} key={day}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <ReactHookForm.Controller
                    name={`operatingHours.${day}.open`}
                    control={control}
                    rules={{ required: t('validation.required') }}
                    render={({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        type="time"
                        label={t(`days.${day}`)}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.operatingHours?.[day]?.open}
                        helperText={errors.operatingHours?.[day]?.open?.message}
                      />
                    )}
                  />
                  <ReactHookForm.Controller
                    name={`operatingHours.${day}.close`}
                    control={control}
                    rules={{ required: t('validation.required') }}
                    render={({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        type="time"
                        label={t('warehouse.close')}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.operatingHours?.[day]?.close}
                        helperText={errors.operatingHours?.[day]?.close?.message}
                      />
                    )}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>{t('warehouse.amenities')}</InputLabel>
            <ReactHookForm.Controller
              name="amenities"
              control={control}
              render={({ field }: FieldProps) => (
                <Select
                  {...field}
                  multiple
                  value={field.value || []}
                  onChange={(e) => field.onChange(e.target.value)}
                  input={<OutlinedInput label={t('warehouse.amenities')} />}
                >
                  {commonAmenities.map((amenity) => (
                    <MenuItem key={amenity} value={amenity}>
                      {t(`warehouse.amenitiesTypes.${amenity}`)}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
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