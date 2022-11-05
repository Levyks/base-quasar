<template>
  <q-breadcrumbs-el
    :label="routeEnum.label.value"
    :icon="routeEnum.icon"
    :to="route.meta.clickable === false ? undefined : route.path"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouteLocationMatched } from 'vue-router';
import { Route } from '@/enums/route';

const props = defineProps<{
  route: RouteLocationMatched;
}>();

const routeEnum = computed(() =>
  Route.fromName(props.route.name as keyof typeof Route)
);
</script>
