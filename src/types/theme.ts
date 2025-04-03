import { PaletteOptions } from '@mui/material/styles';

export interface CustomPaletteOptions extends PaletteOptions {
  status?: {
    pending: {
      background: string;
      text: string;
    };
    confirmed: {
      background: string;
      text: string;
    };
    cancelled: {
      background: string;
      text: string;
    };
    completed: {
      background: string;
      text: string;
    };
  };
} 