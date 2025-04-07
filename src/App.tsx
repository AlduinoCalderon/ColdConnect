import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { lightTheme, darkTheme } from './theme/theme';
import './i18n/i18n';

// Layout components
import Layout from './components/layout/Layout';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Page components
import Home from './pages/Home';
import HomeOwner from './pages/HomeOwner';
import Warehouses from './pages/Warehouses';
import StorageUnits from './pages/StorageUnits';
import StorageUnitDetails from './pages/StorageUnitDetails';
import Bookings from './pages/Bookings';
import Payments from './pages/Payments';
import Users from './pages/Users';
import Sensors from './pages/Sensors';
import Maintenance from './pages/Maintenance';
import Notifications from './pages/Notifications';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import WarehouseDetails from './pages/WarehouseDetails';

const App: React.FC = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Navbar />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home-owner" element={<HomeOwner />} />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/warehouses/:id" element={<WarehouseDetails />} />
            <Route path="/storage-units" element={<StorageUnits />} />
            <Route path="/storage-units/:id" element={<StorageUnitDetails />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/users" element={<Users />} />
            <Route path="/sensors" element={<Sensors />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App; 