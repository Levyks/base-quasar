import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { Route } from '@/enums/route';

export function onlyAnonymous(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) return next(Route.Home.toLocation());
  next();
}

export function onlyAuthenticated(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated)
    return next(Route.Login.toLocation({ goto: to.fullPath }));
  next();
}
