import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteLocationNormalized,
  Router,
} from 'vue-router';
import { route } from 'quasar/wrappers';

import { Route } from '@/enums/route';
import { productName } from 'app/package.json';

import { routes } from './routes';

declare module 'vue-router' {
  interface RouteMeta {
    clickable?: boolean;
  }
}

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

let router: Router;

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  router.afterEach((to) => {
    updateTitle(to);
  });

  return router;
});

export function updateTitle(route?: RouteLocationNormalized) {
  route = route || router.currentRoute.value;
  const routeEnum =
    route.name && Route.fromName(route.name as keyof typeof Route);
  if (routeEnum) document.title = `${routeEnum.label} | ${productName}`;
  else document.title = productName;
}

export { router };
