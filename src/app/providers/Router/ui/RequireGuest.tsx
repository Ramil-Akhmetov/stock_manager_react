import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthData } from '@/entities/User';
import { getRouteMain } from '@/shared/consts/router.ts';

interface RequireGuestProps {
  children: ReactNode;
}

export function RequireGuest({ children }: RequireGuestProps) {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();

  if (auth) {
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }
  return children;
}
