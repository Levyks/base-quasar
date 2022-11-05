<template>
  <ParentMenuItem
    v-if="route.matched[route.matched.length - 1].meta.clickable === false"
    :item="(item as ParentMenuItemDefinition)"
    :route="route"
  />
  <FinalMenuItem
    v-else
    :item="(item as FinalMenuItemDefinition | Route)"
    :route="route"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Route } from '@/enums/route';
import ParentMenuItem from './ParentMenuItem.vue';
import FinalMenuItem from './FinalMenuItem.vue';
import {
  FinalMenuItemDefinition,
  MenuItemDefinition,
  ParentMenuItemDefinition,
} from '@/typings/layout';

const router = useRouter();

const props = defineProps<{
  item: MenuItemDefinition;
}>();

const route = computed(() =>
  router.resolve({
    name: props.item instanceof Route ? props.item.name : props.item.route.name,
  })
);
</script>
