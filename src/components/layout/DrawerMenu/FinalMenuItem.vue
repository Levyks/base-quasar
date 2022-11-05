<template>
  <q-item :to="route" :data-cy="cy" exact>
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label v-if="description" caption>{{ description }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouteLocation } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { FinalMenuItemDefinition } from '@/typings/layout';
import { RouteName } from '@/enums/RouteName';

const i18n = useI18n();

const props = defineProps<{
  item: FinalMenuItemDefinition | RouteName;
  route: RouteLocation & { href: string };
}>();

const cy = computed(() => {
  if (typeof props.item !== 'string' && props.item.cy) return props.item.cy;
  if (props.route.meta.cy) return props.route.meta.cy;
  if (typeof props.route.name === 'string')
    return `menu-${props.route.name.replaceAll('.', '-')}`;
  return undefined;
});

const icon = computed(() => {
  if (typeof props.item === 'string') return props.route.meta.icon;
  return props.item.icon ?? props.route.meta.icon;
});

const label = computed(() => {
  if (typeof props.item === 'string')
    return i18n.t(props.route.meta.labelTranslationKey);
  return i18n.t(
    props.item.labelTranslationKey ?? props.route.meta.labelTranslationKey
  );
});

const description = computed(() => {
  if (typeof props.item !== 'string' && props.item.descriptionTranslationKey)
    return i18n.t(props.item.descriptionTranslationKey);
  if (props.route.meta.descriptionTranslationKey)
    return i18n.t(props.route.meta.descriptionTranslationKey);
  return undefined;
});
</script>
