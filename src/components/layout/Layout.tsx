import React from 'react';
import { Box, styled } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: 64, // Height of the navbar
  marginLeft: 240, // Width of the sidebar
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      {children}
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout; 