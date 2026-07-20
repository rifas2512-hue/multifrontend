import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from './context/AuthContext';
import { setTheme } from './redux/slices/uiSlice';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Deployments from './pages/Deployments';
import AIAssistant from './pages/AIAssistant';
import Login from './pages/Login';
import Register from './pages/Register';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main>{children}</main>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const storedUser = localStorage.getItem('user');
  
  if (!user && !storedUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  const storedUser = localStorage.getItem('user');
  
  if (user || storedUser) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  // Initialize theme on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setTheme(prefersDark ? 'dark' : 'light'));
    }
  }, [dispatch]);

  // Apply theme class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Auth check
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        navigate('/login');
      }
    }
  }, [navigate]);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/projects" element={
          <ProtectedRoute>
            <Layout>
              <Projects />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/deployments" element={
          <ProtectedRoute>
            <Layout>
              <Deployments />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/ai-assistant" element={
          <ProtectedRoute>
            <Layout>
              <AIAssistant />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="*" element={
          <Navigate to={localStorage.getItem('user') ? '/dashboard' : '/login'} replace />
        } />
      </Routes>
    </>
  );
}

export default App;
