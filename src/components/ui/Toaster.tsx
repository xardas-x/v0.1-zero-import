import { Toaster as HotToaster } from 'react-hot-toast';
import { useApp } from '../../hooks/useApp';

const Toaster = () => {
  const { isDarkMode } = useApp();
  
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

export { Toaster };