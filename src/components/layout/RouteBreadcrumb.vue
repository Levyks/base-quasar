<template>
  <q-breadcrumbs active-color="white" style="font-size: 12px">
    <q-breadcrumbs-el
      v-for="matched in routesBreadcrumb"
      :key="matched.path"
      :label="$t(matched.meta.labelTranslationKey)"
      :icon="matched.meta.icon"
      :to="matched.meta.partial ? undefined : matched.path"
    />
  </q-breadcrumbs>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const routesBreadcrumb = computed(() => {
  return route.matched.filter((r) => r.meta.labelTranslationKey);
});
</script>
