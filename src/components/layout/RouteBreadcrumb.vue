<template>
  <q-breadcrumbs active-color="white" style="font-size: 12px">
    <RouteBreadcrumbLink
      v-for="route in routesBreadcrumb"
      :key="route.path"
      :route="route"
    />
  </q-breadcrumbs>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import RouteBreadcrumbLink from '@/components/layout/RouteBreadcrumbLink.vue';

const route = useRoute();

const routesBreadcrumb = computed(() => {
  return route.matched.filter((r) => r.name);
});
</script>
