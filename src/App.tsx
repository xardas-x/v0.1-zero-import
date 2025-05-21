import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UserProfileProvider } from './context/UserProfileContext';
import { WorkoutProvider } from './context/WorkoutContext';
import HomePage from './pages/HomePage';
import { Toaster } from './components/ui/Toaster';
import ErrorBoundary from './components/ui/ErrorBoundary';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <UserProfileProvider>
      <WorkoutProvider>
        {children}
      </WorkoutProvider>
    </UserProfileProvider>
  </ThemeProvider>
);

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <Toaster />
        <HomePage />
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;