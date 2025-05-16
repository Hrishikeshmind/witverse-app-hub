
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, requireAuth = true }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        navigate('/login', { replace: true });
      } else if (!requireAuth && user) {
        navigate('/profile', { replace: true });
      }
    }
  }, [user, isLoading, requireAuth, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // Only render children if auth requirements are met
  if ((requireAuth && user) || (!requireAuth && !user) || !requireAuth) {
    return <>{children}</>;
  }

  return null;
};

export default RouteGuard;
