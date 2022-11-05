import { computed, Ref, ref } from 'vue';
import { QTable, QTableColumn, useQuasar } from 'quasar';
import { updatePaginationRef } from '@/services/pagination';
import {
  TableItem,
  TableRef,
  UseTableOptions,
  UseTableOptionsParsed,
} from '@/typings/composables';
import { QTablePagination } from '@/typings/pagination';
import { useI18n } from 'vue-i18n';
import { confirmAndDelete } from '../services/crud';
import { useRouter } from 'vue-router';
import { JSONObject } from '../typings/misc';

function parseUseTableOptions<
  T extends Record<string, unknown>,
  F extends JSONObject
>(options: UseTableOptions<T, F>): UseTableOptionsParsed<T, F> {
  return {
    columns: ref(options.columns) as Ref<QTableColumn<T>[]>,
    getPage: options.getPage,

    showReload: ref(options.showReload ?? true),

    showView: ref(options.showView ?? true),
    allowView: options.allowView ?? (() => true),
    manualView: options.manualView,
    autoView: options.autoView,

    showCreate: ref(options.showCreate ?? true),
    manualCreate: options.manualCreate ?? undefined,
    autoCreate: options.autoCreate ?? undefined,

    showEdit: ref(options.showEdit ?? true),
    allowEdit: options.allowEdit ?? (() => true),
    manualEdit: options.manualEdit ?? undefined,
    autoEdit: options.autoEdit ?? undefined,

    showDelete: ref(options.showDelete ?? true),
    allowDelete: options.allowDelete ?? (() => true),
    manualDelete: options.manualDelete ?? undefined,
    autoDelete: options.autoDelete ?? undefined,

    getFilterFromSearch: options.getFilterFromSearch ?? null,
    getRowTitle: options.getRowTitle,
    rowKey: ref(options.rowKey ?? 'id'),
    initialPageSize: ref(options.initialPageSize ?? 10),
    actionsColumnName: ref(options.actionsColumnName ?? 'actions'),
    addActionsColumn: ref(options.addActionsColumn ?? true),
  };
}

function convertToTableItem<T extends Record<string, unknown>>(
  item: T
): TableItem<T> {
  return Object.assign(item, {
    loadingDelete: false,
  });
}

export function useTable<
  T extends Record<string, unknown>,
  F extends JSONObject
>(options: UseTableOptions<T, F>): TableRef<T, F> {
  const parsed = parseUseTableOptions(options);

  const $q = useQuasar();
  const i18n = useI18n();
  const router = useRouter();

  const pagination = ref<QTablePagination>();
  const loading = ref(false);
  const rows = ref([]) as Ref<TableItem<T>[]>;
  const search = ref('');

  const fetchPage = (page: number, size: number) => {
    loading.value = true;
    const filter = parsed.getFilterFromSearch?.(search.value);
    parsed
      .getPage({ page, size }, filter)
      .then((data) => {
        updatePaginationRef(data, pagination);
        rows.value = data.content.map(convertToTableItem);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  fetchPage(0, parsed.initialPageSize.value);

  const onRequest: QTable['onRequest'] = (props) => {
    fetchPage(props.pagination!.page - 1, props.pagination!.rowsPerPage);
  };

  const autoDelete = (item: TableItem<T>) => {
    if (!parsed.autoDelete) return Promise.resolve();
    return confirmAndDelete({
      title: parsed.autoDelete.getTitle?.(item),
      message: parsed.autoDelete.getMessage?.(item),
      loadingMessage: parsed.autoDelete.getLoadingMessage?.(item),
      successMessage: parsed.autoDelete.getSuccessMessage?.(item),
      errorMessage: parsed.autoDelete.getErrorMessage?.(item),
      deleteFn: () => parsed.autoDelete!.delete(item),
      onSuccess: () => reload(),
    });
  };

  const onCreate = () => {
    if (parsed.manualCreate) return parsed.manualCreate();
    if (parsed.autoCreate?.route) {
      return router.push(parsed.autoCreate.route);
    } else if (parsed.autoCreate?.dialog) {
      $q.dialog({
        component: parsed.autoCreate.dialog,
        componentProps: parsed.autoCreate.dialogProps,
      }).onOk(() => reload());
    }
  };

  const onView = (item: TableItem<T>) => {
    if (parsed.manualView) return parsed.manualView(item);
    if (parsed.autoView?.getRoute) {
      return router.push(parsed.autoView.getRoute(item));
    } else if (parsed.autoView?.dialog) {
      $q.dialog({
        component: parsed.autoView.dialog,
        componentProps: parsed.autoView.getDialogProps?.(item),
      });
    }
  };

  const onEdit = (item: TableItem<T>) => {
    if (parsed.manualEdit) return parsed.manualEdit(item);
    if (parsed.autoEdit?.getRoute) {
      return router.push(parsed.autoEdit.getRoute(item));
    } else if (parsed.autoEdit?.dialog) {
      $q.dialog({
        component: parsed.autoEdit.dialog,
        componentProps: parsed.autoEdit.getDialogProps?.(item),
      }).onOk(() => reload());
    }
  };

  const onDelete = (item: TableItem<T>) => {
    if (!parsed.manualDelete && !parsed.autoDelete) return Promise.resolve();
    item.loadingDelete = true;
    const fn = parsed.manualDelete ? parsed.manualDelete : autoDelete;
    return fn(item).finally(() => {
      item.loadingDelete = false;
    });
  };

  const reload = () =>
    fetchPage(pagination.value!.page - 1, pagination.value!.rowsPerPage);

  const setSearch = (value: string) => {
    search.value = value;
    reload();
  };

  const setRowsPerPage = (value: number) => {
    pagination.value!.rowsPerPage = value;
    reload();
  };

  const columnsComputed = computed(() => {
    if (!parsed.addActionsColumn.value) {
      return parsed.columns.value;
    }
    return parsed.columns.value.concat({
      name: parsed.actionsColumnName.value,
      label: i18n.t('misc.columns.actions'),
      field: () => null,
      align: 'left',
    });
  });

  return {
    ...parsed,
    columns: columnsComputed,
    pagination,
    onRequest,
    onCreate,
    onView,
    onEdit,
    onDelete,
    reload,
    rows,
    loading,
    search,
    setSearch,
    setRowsPerPage,
  };
}

export class Listable {
  loadingDelete = false;
}
