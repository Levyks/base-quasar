<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-secondary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          data-cy="menu-toggle"
        />
        <HeaderTitle />
        <LanguageSelect class="q-mr-sm" />
        <UserDropdown />
      </q-toolbar>
      <q-toolbar inset style="min-height: 32px">
        <RouteBreadcrumb />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered data-cy="menu">
      <DrawerMenu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import UserDropdown from '@/components/layout/UserDropdown.vue';
import HeaderTitle from '@/components/layout/HeaderTitle.vue';
import DrawerMenu from '@/components/layout/DrawerMenu';
import RouteBreadcrumb from '@/components/layout/RouteBreadcrumb.vue';
import LanguageSelect from '@/components/layout/LanguageSelect.vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
