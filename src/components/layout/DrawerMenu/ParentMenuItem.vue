<template>
  <q-expansion-item
    ref="expansionItemRef"
    expand-separator
    :icon="item.icon ?? route.meta.icon"
    :label="$t(item.labelTranslationKey ?? route.meta.labelTranslationKey)"
    :description="description"
    :data-cy="cy"
    header-class="q-expansion-item-header"
  >
    <q-list>
      <DrawerMenuItem
        class="q-pl-lg"
        v-for="(childItem, idx) in item.children"
        :key="idx"
        :item="childItem"
      />
    </q-list>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { RouteLocation, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { QExpansionItem } from 'quasar';
import { ParentMenuItemDefinition } from '@/typings/layout';
import DrawerMenuItem from './DrawerMenuItem.vue';

const expansionItemRef = ref<QExpansionItem | null>(null);
const currentRoute = useRoute();

const i18n = useI18n();

const props = defineProps<{
  item: ParentMenuItemDefinition;
  route: RouteLocation & { href: string };
}>();

const cy = computed(() => {
  if (props.item.cy) return props.item.cy;
  if (props.route.meta.cy) return props.route.meta.cy;
  if (typeof props.route.name === 'string')
    return `menu-${props.route.name.replaceAll('.', '-')}`;
  return '';
});

const description = computed(() => {
  if (props.item.descriptionTranslationKey)
    return i18n.t(props.item.descriptionTranslationKey);
  if (props.route.meta.descriptionTranslationKey)
    return i18n.t(props.route.meta.descriptionTranslationKey);
  return '';
});

const active = computed(
  () =>
    props.route.name &&
    currentRoute.matched.some((route) => route.name === props.route.name)
);

function updateItemClass() {
  if (!expansionItemRef.value) return;
  const itemDom = expansionItemRef.value.$el.querySelector('.q-item');
  if (active.value) {
    itemDom?.classList.add(expansionItemRef.value.activeClass);
  } else {
    itemDom?.classList.remove(expansionItemRef.value.activeClass);
  }
}

watch(active, updateItemClass, {
  immediate: true,
});

onMounted(updateItemClass);
</script>
