import { RouteProps } from 'react-router-dom';
import { Role } from '@/app/providers/Router/config/routeConfig.tsx';

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  guestOnly?: boolean;
  roles?: Role[];
};
