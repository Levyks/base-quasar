<template>
  <q-td :props="cellProps">
    <div class="row align-center no-wrap">
      <q-btn
        flat
        round
        icon="visibility"
        color="positive"
        size="sm"
        v-if="table.showView.value"
        :disable="!table.allowView(item)"
        @click="table.onView(item)"
        :title="$t('misc.buttons.view')"
        data-cy="table-view-button"
      />
      <q-btn
        flat
        round
        icon="edit"
        color="primary"
        size="sm"
        v-if="table.showEdit.value"
        :disable="!table.allowEdit(item)"
        @click="table.onEdit(item)"
        :title="$t('misc.buttons.edit')"
        data-cy="table-edit-button"
      />
      <q-btn
        flat
        round
        icon="delete"
        color="negative"
        size="sm"
        v-if="table.showDelete.value"
        :loading="item.loadingDelete"
        :disable="!table.allowDelete(item)"
        @click="table.onDelete(item)"
        :title="$t('misc.buttons.delete')"
        data-cy="table-delete-button"
      />
    </div>
  </q-td>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { QTableSlots } from 'quasar';
import { TableItem, TableRef } from '@/typings/composables';

const props = defineProps<{
  table: TableRef<any, any>;
  cellProps: Parameters<QTableSlots[`body-cell-${string}`]>[0];
}>();

const item = computed(() => props.cellProps.row as TableItem<any>);
</script>
