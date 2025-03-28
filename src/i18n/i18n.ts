import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      common: {
        welcome: 'Welcome to ColdStorageHub',
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        search: 'Search',
        settings: 'Settings',
        profile: 'Profile',
      },
      navigation: {
        home: 'Home',
        warehouses: 'Warehouses',
        bookings: 'Bookings',
        sensors: 'Sensors',
        reports: 'Reports',
      },
      warehouse: {
        title: 'Cold Storage Warehouses',
        add: 'Add Warehouse',
        edit: 'Edit Warehouse',
        delete: 'Delete Warehouse',
        details: 'Warehouse Details',
        temperature: 'Temperature',
        humidity: 'Humidity',
        capacity: 'Capacity',
        status: 'Status',
      },
      booking: {
        title: 'Bookings',
        new: 'New Booking',
        edit: 'Edit Booking',
        cancel: 'Cancel Booking',
        status: 'Booking Status',
        startDate: 'Start Date',
        endDate: 'End Date',
      },
      settings: {
        title: 'Settings',
        language: 'Language',
        theme: 'Theme',
        darkMode: 'Dark Mode',
        notifications: 'Notifications',
      },
    },
  },
  es: {
    translation: {
      common: {
        welcome: 'Bienvenido a ColdStorageHub',
        login: 'Iniciar Sesión',
        register: 'Registrarse',
        logout: 'Cerrar Sesión',
        search: 'Buscar',
        settings: 'Configuración',
        profile: 'Perfil',
      },
      navigation: {
        home: 'Inicio',
        warehouses: 'Almacenes',
        bookings: 'Reservas',
        sensors: 'Sensores',
        reports: 'Reportes',
      },
      warehouse: {
        title: 'Almacenes Fríos',
        add: 'Agregar Almacén',
        edit: 'Editar Almacén',
        delete: 'Eliminar Almacén',
        details: 'Detalles del Almacén',
        temperature: 'Temperatura',
        humidity: 'Humedad',
        capacity: 'Capacidad',
        status: 'Estado',
      },
      booking: {
        title: 'Reservas',
        new: 'Nueva Reserva',
        edit: 'Editar Reserva',
        cancel: 'Cancelar Reserva',
        status: 'Estado de la Reserva',
        startDate: 'Fecha de Inicio',
        endDate: 'Fecha de Fin',
      },
      settings: {
        title: 'Configuración',
        language: 'Idioma',
        theme: 'Tema',
        darkMode: 'Modo Oscuro',
        notifications: 'Notificaciones',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 