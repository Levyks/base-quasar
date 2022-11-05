import { RouteRecordRaw } from 'vue-router';
import { computed } from 'vue';

import { i18n } from '@/boot/i18n';
import { PartialRouteName, RouteName } from '@/enums/RouteName';

import { onlyAnonymous, onlyAuthenticated } from './guards';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: [onlyAuthenticated],
    children: [
      {
        name: RouteName.Home,
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          label: computed(() => i18n.global.t('routes.home')),
          icon: 'home',
        },
      },
      {
        name: RouteName.Profile,
        path: 'profile',
        component: () => import('pages/ProfilePage.vue'),
        meta: {
          label: computed(() => i18n.global.t('routes.profile')),
          icon: 'person',
        },
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/AnonymousLayout.vue'),
    children: [
      {
        path: '/login',
        name: RouteName.Login,
        component: () => import('pages/LoginPage.vue'),
        beforeEnter: [onlyAnonymous],
        meta: {
          label: computed(() => i18n.global.t('routes.login')),
          icon: 'login',
        },
      },
      // Always leave this as last one
      {
        path: '/:catchAll(.*)*',
        name: PartialRouteName.NotFound,
        component: () => import('app/src/pages/NotFoundPage.vue'),
        meta: {
          label: computed(() => i18n.global.t('routes.notFound')),
          icon: 'error',
          partial: true,
        },
      },
    ],
  },
];
