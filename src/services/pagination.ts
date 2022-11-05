import { Ref } from 'vue';
import { Pagination } from '@/models';
import { QTablePagination } from '@/typings/pagination';

export function updatePaginationRef(
  pagination: Pagination,
  paginationRef: Ref<QTablePagination | undefined>
) {
  paginationRef.value = {
    sortBy: 'id',
    descending: false,
    page: pagination.number + 1,
    rowsPerPage: pagination.itemsPerPage,
    rowsNumber: pagination.totalElements,
  };
}
