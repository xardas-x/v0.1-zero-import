import { Toaster as HotToaster } from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

export const Toaster = () => {
  const { isDarkMode } = useAppContext();
  
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        style: {
          background: isDarkMode ? '#1f2937' : '#ffffff',
          color: isDarkMode ? '#f3f4f6' : '#1f2937',
          border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: 'white',
          },
        },
      }}
    />
  );
};