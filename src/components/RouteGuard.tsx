
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, requireAuth = true }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      console.log("RouteGuard: Auth check complete", { user: !!user, requireAuth });
      
      if (requireAuth && !user) {
        console.log("RouteGuard: Redirecting to login");
        navigate('/login', { replace: true });
      } else if (!requireAuth && user) {
        console.log("RouteGuard: Redirecting to profile");
        navigate('/profile', { replace: true });
      }
      
      setCheckingAuth(false);
    }
  }, [user, isLoading, requireAuth, navigate]);

  if (isLoading || checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // Only render children if auth requirements are met
  if ((requireAuth && user) || (!requireAuth && !user)) {
    return <>{children}</>;
  }

  // Fallback while navigation is happening
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
    </div>
  );
};

export default RouteGuard;
