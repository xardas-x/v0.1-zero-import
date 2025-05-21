import React from 'react';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import { Toaster } from './components/ui/Toaster';
import ErrorBoundary from './components/ui/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Toaster />
        <HomePage />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;