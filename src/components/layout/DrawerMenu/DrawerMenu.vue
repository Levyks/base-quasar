<template>
  <q-list>
    <DrawerMenuItem v-for="(item, idx) in items" :key="idx" :item="item" />
  </q-list>
</template>

<script setup lang="ts">
import { Route } from '@/enums/route';
import DrawerMenuItem from './DrawerMenuItem.vue';
import { MenuItemDefinition } from '@/typings/layout';

const items: MenuItemDefinition[] = [Route.Home];
</script>
