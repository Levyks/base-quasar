<template>
  <q-table
    dense
    :title="title"
    title-class="text-h5 q-my-xs"
    :columns="use.columns.value"
    :rows="use.rows.value"
    :row-key="use.rowKey.value"
    :loading="use.loading.value"
    :pagination="use.pagination.value"
    @update:pagination="onUpdatePagination"
    @request="use.onRequest"
  >
    <template v-if="use.getFilterFromSearch" v-slot:top-right>
      <TableSearch :table="use" />
    </template>
    <template
      v-for="column in use.columns.value"
      :key="column.name"
      #[`body-cell-${column.name}`]="props"
    >
      <slot
        :name="`body-cell-${column.name}`"
        v-bind="props"
        :data-cy="`table-cell-${column.name}`"
      >
        <TableCell
          :cell-props="props"
          :table="use"
          v-if="column.name !== use.actionsColumnName.value"
          :data-cy="`table-cell-${column.name}`"
        />
        <ActionsTableCell
          v-else
          :cell-props="props"
          :table="use"
          :data-cy="`table-cell-${column.name}`"
        />
      </slot>
    </template>
    <template #bottom="props">
      <TableBottom :table="use" :slotProps="props" />
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { QTable } from 'quasar';
import { TableRef } from '@/typings/composables';
import ActionsTableCell from './ActionsTableCell.vue';
import TableSearch from './TableSearch.vue';
import TableBottom from './TableBottom.vue';
import TableCell from './TableCell.vue';

defineProps<{
  title?: string;
  use: TableRef<any, any>;
}>();

// Doesn't work without it for some reason
const onUpdatePagination = () => null;
</script>
