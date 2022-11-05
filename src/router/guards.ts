import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { RouteName } from '@/enums/RouteName';

export function onlyAnonymous(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) return next({ name: RouteName.Home });
  next();
}

export function onlyAuthenticated(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated)
    return next({ name: RouteName.Login, query: { goto: to.fullPath } });
  next();
}
