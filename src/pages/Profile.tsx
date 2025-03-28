import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Profile: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">
        {t('common.profile')}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Profile page content will be displayed here
      </Typography>
    </Box>
  );
};

export default Profile; 