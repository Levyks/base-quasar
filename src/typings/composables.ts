import { Ref, Component } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { QTableColumn } from 'quasar';
import { JSONObject, ValueOrRef } from './misc';
import { QTablePagination } from './pagination';
import { Pagination } from '../models/pagination';

export type AutoCreateOptions = {
  route?: RouteLocationRaw;
  dialog?: Component;
  dialogProps?: Record<string, unknown>;
};

export type AutoViewOptions<T extends Record<string, unknown>> = {
  getRoute?: (item: TableItem<T>) => RouteLocationRaw;
  dialog?: Component;
  getDialogProps?: (item: TableItem<T>) => Record<string, unknown>;
};

export type AutoEditOptions<T extends Record<string, unknown>> = {
  getRoute?: (item: TableItem<T>) => RouteLocationRaw;
  dialog?: Component;
  getDialogProps?: (item: TableItem<T>) => Record<string, unknown>;
};

export type AutoDeleteOptions<T extends Record<string, unknown>> = {
  getTitle?: (item: TableItem<T>) => string;
  getMessage?: (item: TableItem<T>) => string;
  getLoadingMessage?: (item: TableItem<T>) => string;
  getSuccessMessage?: (item: TableItem<T>) => string;
  getErrorMessage?: (item: TableItem<T>) => string;
  delete: (item: T) => Promise<any>;
};

export type UseTableOptions<
  T extends Record<string, unknown>,
  F extends JSONObject
> = {
  columns: ValueOrRef<QTableColumn<T>[]>;
  getPage: (
    props: {
      page: number;
      size: number;
    },
    filter?: F
  ) => Promise<Pagination<T>>;

  showReload?: ValueOrRef<boolean>;

  showView?: ValueOrRef<boolean>;
  allowView?: (item: TableItem<T>) => boolean;
  manualView?: (item: TableItem<T>) => void;
  autoView?: AutoViewOptions<T>;

  showCreate?: ValueOrRef<boolean>;
  manualCreate?: () => any;
  autoCreate?: AutoCreateOptions;

  showEdit?: ValueOrRef<boolean>;
  allowEdit?: (item: TableItem<T>) => boolean;
  manualEdit?: (item: TableItem<T>) => any;
  autoEdit?: AutoEditOptions<T>;

  showDelete?: ValueOrRef<boolean>;
  allowDelete?: (item: TableItem<T>) => boolean;
  manualDelete?: (item: TableItem<T>) => Promise<any>;
  autoDelete?: AutoDeleteOptions<T>;

  getFilterFromSearch?: (search: string) => F;
  getRowTitle?: (item: TableItem<T>) => string | undefined;
  rowKey?: ValueOrRef<string>;
  initialPageSize?: ValueOrRef<number>;
  actionsColumnName?: ValueOrRef<string>;
  addActionsColumn?: ValueOrRef<boolean>;
};

export type UseTableOptionsParsed<
  T extends Record<string, unknown>,
  F extends JSONObject
> = {
  columns: Ref<QTableColumn<T>[]>;
  getPage: (
    props: {
      page: number;
      size: number;
    },
    filter?: F
  ) => Promise<Pagination<T>>;

  showReload: Ref<boolean>;

  showView: Ref<boolean>;
  allowView: (item: TableItem<T>) => boolean;
  manualView?: (item: TableItem<T>) => void;
  autoView?: AutoViewOptions<T>;

  showCreate: Ref<boolean>;
  manualCreate?: () => any;
  autoCreate?: AutoCreateOptions;

  showEdit: Ref<boolean>;
  allowEdit: (item: TableItem<T>) => boolean;
  manualEdit?: (item: TableItem<T>) => any;
  autoEdit?: AutoEditOptions<T>;

  showDelete: Ref<boolean>;
  allowDelete: (item: TableItem<T>) => boolean;
  manualDelete?: (item: TableItem<T>) => Promise<any>;
  autoDelete?: AutoDeleteOptions<T>;

  getFilterFromSearch?: ((search: string) => F) | null;
  getRowTitle?: (item: TableItem<T>) => string | undefined;
  rowKey: Ref<string>;
  initialPageSize: Ref<number>;
  actionsColumnName: Ref<string>;
  addActionsColumn: Ref<boolean>;
};

export type TableRef<
  T extends Record<string, unknown>,
  F extends JSONObject
> = UseTableOptionsParsed<T, F> & {
  pagination: Ref<QTablePagination | undefined>;
  onRequest:
    | ((requestProp: {
        pagination: {
          sortBy: string;
          descending: boolean;
          page: number;
          rowsPerPage: number;
        };
        filter?: any;
        getCellValue: (col: any, row: any) => any;
      }) => void)
    | undefined;
  reload: () => void;
  rows: Ref<T[]>;
  loading: Ref<boolean>;
  search: Ref<string>;
  setSearch: (search: string) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  onCreate: () => any;
  onView: (item: TableItem<T>) => any;
  onEdit: (item: TableItem<T>) => any;
  onDelete: (item: TableItem<T>) => Promise<any>;
  getRowTitle?: (item: TableItem<T>) => string | undefined;
};

export type TableItem<T extends Record<string, unknown>> = {
  loadingDelete: boolean;
} & T;
