<template>
  <MainLayout
    v-if="routesToShowMainLayout.includes(route.name as RouteName | PartialRouteName) && authStore.isAuthenticated"
  />
  <q-layout v-else view="hHh lpr fFf">
    <q-header elevated class="bg-secondary">
      <q-toolbar>
        <HeaderTitle />
        <LanguageSelect class="q-mr-sm" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

import { RouteName, PartialRouteName } from '@/enums/RouteName';

import MainLayout from './MainLayout.vue';
import HeaderTitle from '@/components//layout/HeaderTitle.vue';
import LanguageSelect from '@/components//layout/LanguageSelect.vue';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const authStore = useAuthStore();

const routesToShowMainLayout: Array<RouteName | PartialRouteName> = [
  PartialRouteName.NotFound,
];
</script>
