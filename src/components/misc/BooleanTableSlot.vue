<template>
  <q-td :props="cellProps">
    <q-icon v-if="cellProps.value" name="check" color="green" size="sm" />
    <q-icon v-else name="close" color="red" size="sm" />
  </q-td>
</template>

<script setup lang="ts">
import { QTableSlots } from 'quasar';
defineProps<{
  cellProps: Parameters<QTableSlots[`body-cell-${string}`]>[0] & {
    'data-cy'?: string;
  };
}>();
</script>
