<template>
  <ParentMenuItem
    v-if="route.matched[route.matched.length - 1].meta.partial"
    :item="(item as ParentMenuItemDefinition)"
    :route="route"
  />
  <FinalMenuItem
    v-else
    :item="(item as FinalMenuItemDefinition | RouteName)"
    :route="route"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ParentMenuItem from './ParentMenuItem.vue';
import FinalMenuItem from './FinalMenuItem.vue';
import {
  FinalMenuItemDefinition,
  MenuItemDefinition,
  ParentMenuItemDefinition,
} from '@/typings/layout';
import { RouteName } from '@/enums/RouteName';

const router = useRouter();

const props = defineProps<{
  item: MenuItemDefinition;
}>();

const route = computed(() =>
  router.resolve({
    name: typeof props.item === 'string' ? props.item : props.item.route,
  })
);
</script>
