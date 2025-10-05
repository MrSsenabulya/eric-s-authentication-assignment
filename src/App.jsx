import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './index.css';

import ProtectedRoute from './components/ProtectedRoute';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from './contexts/MockAuthContext';
import SimpleTest from './components/SimpleTest';

function App() {
  return (
    <AuthProvider>
      <MantineProvider>
        <Notifications />
        <Router>
          <Routes>
            <Route path="/test" element={<SimpleTest />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </MantineProvider>
    </AuthProvider>
  );
}

export default App;
