import { RouteRecordRaw } from 'vue-router';

import { onlyAnonymous, onlyAuthenticated } from './guards';
import { Route } from '@/enums/route';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    beforeEnter: [onlyAuthenticated],
    children: [
      {
        name: Route.Home.name,
        path: '',
        component: () => import('@/pages/IndexPage.vue'),
      },
      {
        name: Route.Profile.name,
        path: 'profile',
        component: () => import('@/pages/ProfilePage.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('@/layouts/AnonymousLayout.vue'),
    children: [
      {
        name: Route.Login.name,
        path: '/login',
        component: () => import('@/pages/LoginPage.vue'),
        beforeEnter: [onlyAnonymous],
      },
      // Always leave this as last one
      {
        name: Route.NotFound.name,
        path: '/:catchAll(.*)*',
        component: () => import('@/pages/NotFoundPage.vue'),
        meta: {
          clickable: false,
        },
      },
    ],
  },
];
