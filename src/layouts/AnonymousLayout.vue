<template>
  <MainLayout
    v-if="
      typeof route.name === 'string' &&
      routesToShowMainLayout.includes(route.name) &&
      authStore.isAuthenticated
    "
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

import { Route } from '@/enums/route';
import { useAuthStore } from '@/stores/auth';

import MainLayout from './MainLayout.vue';
import HeaderTitle from '@/components/layout/HeaderTitle.vue';
import LanguageSelect from '@/components/layout/LanguageSelect.vue';

const route = useRoute();
const authStore = useAuthStore();

const routesToShowMainLayout = [Route.NotFound].map((r) => r.name);
</script>
