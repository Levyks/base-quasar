<template>
  <div class="row items-center">
    <div class="q-table__control">
      <span class="q-table__bottom-item">{{
        $q.lang.table.recordsPerPage
      }}</span>
    </div>

    <div class="q-table__control">
      <q-select
        dense
        borderless
        :model-value="slotProps.pagination.rowsPerPage"
        options-dense
        :options="rowsPerPageOptions"
        class="q-mr-md"
        emit-value
        map-options
        @update:model-value="onRowsPerPageChange"
        data-cy="table-rows-per-page-select"
      >
      </q-select>
    </div>
    <div class="q-table__control">
      <span class="q-table__bottom-item" data-cy="table-pagination-text">{{
        $q.lang.table.pagination(start, end, rowsNumber)
      }}</span>
    </div>
    <div class="row align-center">
      <q-btn
        icon="chevron_left"
        dense
        flat
        round
        @click="slotProps.prevPage"
        :disable="slotProps.isFirstPage"
        data-cy="table-prev-page-button"
      />
      <q-btn
        icon="chevron_right"
        dense
        flat
        round
        @click="slotProps.nextPage"
        :disable="slotProps.isLastPage"
        data-cy="table-next-page-button"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { QTableSlots, useQuasar } from 'quasar';
import { TableRef } from '@/typings/composables';
import { QTablePagination } from '@/typings/pagination';
import { computed } from 'vue';

const $q = useQuasar();

const props = defineProps<{
  table: TableRef<any, any>;
  slotProps: Parameters<QTableSlots['bottom']>[0];
}>();

const rowsPerPageOptions = computed(() =>
  [5, 10, 15, 20, 25, 50].map((value) => ({
    label: value === 0 ? $q.lang.table.allRows : value.toString(),
    value,
  }))
);

const rowsNumber = computed(
  () => (props.slotProps.pagination as QTablePagination).rowsNumber
);

const start = computed(
  () =>
    props.slotProps.pagination.rowsPerPage *
      (props.slotProps.pagination.page - 1) +
    1
);

const end = computed(() =>
  Math.min(
    props.slotProps.pagination.rowsPerPage * props.slotProps.pagination.page,
    rowsNumber.value
  )
);

function onRowsPerPageChange(value: number) {
  props.table.setRowsPerPage(value);
}
</script>
