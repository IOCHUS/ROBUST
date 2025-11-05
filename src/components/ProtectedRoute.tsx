import { useAuth } from '@/context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session } = useAuth();
  const location = useLocation();

  // If no session → redirect to login, preserve "from" path
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If session exists → render protected content
  return <>{children}</>;
}