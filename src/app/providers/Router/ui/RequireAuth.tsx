import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Role } from '@/app/providers/Router/config/routeConfig.tsx';
import { ErrorPage } from '@/pages/ErrorPage';
import { getUserAuthData } from '@/entities/User';
import { getRouteLogin } from '@/shared/consts/router.ts';

interface RequireAuthProps {
  roles?: Role[];
  children: ReactNode;
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={getRouteLogin()} state={{ from: location }} replace />;
  }

  let userHasRequiredRole = true;
  if (roles) {
    userHasRequiredRole = roles?.some((role) => {
      return auth.roles.some((authRole) => authRole.name === role);
    });
  }

  if (!userHasRequiredRole) {
    // You can customize this redirect to an access denied page if available
    return (
      <ErrorPage
        statusCode={403}
        message="Недостаточно прав"
        reloadButton={false}
      />
    );
  }

  return children;
}
