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
import Warehouses from './pages/Warehouses';
import Bookings from './pages/Bookings';
import Sensors from './pages/Sensors';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

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
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/sensors" element={<Sensors />} />
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