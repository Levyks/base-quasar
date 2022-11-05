<template>
  <q-input
    :model-value="table.search.value"
    dense
    debounce="300"
    :placeholder="$t('misc.labels.search')"
    @update:model-value="table.setSearch"
    data-cy="table-search-input"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { TableRef } from '@/typings/composables';

defineProps<{
  table: TableRef<any, any>;
}>();
</script>
