<template>
  <div class="col-grow row items-center justify-between">
    <div class="row items-center">
      <q-btn
        v-if="table.showCreate"
        dense
        flat
        round
        icon="add"
        color="primary"
        class="q-mx-sm"
        @click="table.onCreate"
        :title="$t('misc.buttons.new')"
        data-cy="create-button"
      />
      <q-btn
        v-if="table.showReload"
        dense
        flat
        round
        icon="refresh"
        color="positive"
        class="q-mx-sm"
        @click="table.reload"
        :title="$t('misc.buttons.refresh')"
        data-cy="refresh-button"
      />
    </div>
    <TablePagination :table="table" :slotProps="slotProps" />
  </div>
</template>

<script setup lang="ts">
import { QTableSlots } from 'quasar';
import { TableRef } from '@/typings/composables';
import TablePagination from './TablePagination.vue';

defineProps<{
  table: TableRef<any, any>;
  slotProps: Parameters<QTableSlots['bottom']>[0];
}>();
</script>
