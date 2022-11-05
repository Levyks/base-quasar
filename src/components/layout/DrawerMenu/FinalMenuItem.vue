<template>
  <q-item :to="location" :data-cy="cy" exact>
    <q-item-section v-if="icon" avatar>
      <q-icon :name="item.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label v-if="description" caption>{{ description }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FinalMenuItemDefinition } from '@/typings/layout';
import { Route } from '@/enums/route';

const props = defineProps<{
  item: FinalMenuItemDefinition | Route;
}>();

const location = computed(() => {
  if (props.item instanceof Route) return props.item.toLocation();

  return props.item.route.toLocation();
});

const cy = computed(() => {
  const getCyFromName = (name: string) =>
    `menu-${name.replaceAll('.', '-').toLocaleLowerCase()}`;

  if (props.item instanceof Route) return getCyFromName(props.item.name);
  if (props.item.cy) return props.item.cy;
  return getCyFromName(props.item.route.name);
});

const icon = computed(() => {
  if (props.item instanceof Route) return props.item.icon;
  return props.item.icon ?? props.item.route.icon;
});

const label = computed(() => {
  if (props.item instanceof Route) return props.item.label.value;
  return props.item.icon ?? props.item.route.icon;
});

const description = computed(() => {
  if (props.item instanceof Route) return props.item.description?.value;
  return props.item.description?.value ?? props.item.route.description?.value;
});
</script>
