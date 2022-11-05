<template>
  <q-td ref="tdRef" :props="cellProps">
    {{ cellProps.value }}
  </q-td>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { QTableSlots, QTd } from 'quasar';
import { TableItem, TableRef } from '@/typings/composables';

const props = defineProps<{
  table: TableRef<any, any>;
  cellProps: Parameters<QTableSlots[`body-cell-${string}`]>[0];
}>();

const tdRef = ref<QTd | null>(null);

const item = computed(() => props.cellProps.row as TableItem<any>);

function setRowTitle() {
  if (!tdRef.value || !props.table.getRowTitle) return;
  const td = tdRef.value.$el as HTMLTableCellElement;
  const tr = td.parentElement as HTMLTableRowElement;
  if (tr) tr.title = props.table.getRowTitle(item.value) ?? '';
}

onMounted(setRowTitle);

watch(item, setRowTitle, {
  immediate: true,
});
</script>
