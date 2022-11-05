<template>
  <q-select
    :label="label"
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
    :options="options"
    :option-label="optionLabel"
    :option-value="optionValue"
    :rules="rules"
    :loading="loading || loadingInternal"
    :disable="disable"
    :use-input="useInput"
    :use-chips="useChips"
    :multiple="multiple"
    @filter="onFilter"
    @virtual-scroll="onScroll"
  >
    <template v-slot:prepend v-if="icon">
      <q-icon :name="icon" />
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { nextTick, PropType, ref, computed } from 'vue';

import { QSelect } from 'quasar';

import { showErrorFromObj } from '@/services/notification';
import {
  createDefaultRequiredRule,
  createDefaultRequiredRuleMultiple,
} from '@/services/validation';

import { BaseModel, Pagination } from '@/models';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  modelValue: {
    type: Object as PropType<BaseModel | BaseModel[]>,
    required: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: true,
  },
  useInput: {
    type: Boolean,
    default: true,
  },
  useChips: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  pageSize: {
    type: Number,
    default: 20,
  },
  optionLabel: {
    type: String,
    default: 'name',
  },
  optionValue: {
    type: String,
    default: 'id',
  },
  getPage: {
    type: Function as PropType<
      (
        props: {
          page: number;
          size: number;
        },
        filter?: any
      ) => Promise<Pagination>
    >,
    required: true,
  },
  getFilter: {
    type: Function as PropType<(search: string) => any>,
    required: false,
  },
});

defineEmits(['update:model-value']);

const options = ref<any[]>([]);
const loadingInternal = ref(false);
const search = ref<string>('');
const lastFetchedPage = ref<Pagination>();

const rules = computed(() => {
  if (!props.required) return;
  if (props.multiple) return [createDefaultRequiredRuleMultiple()];
  return [createDefaultRequiredRule()];
});

function fetchPage(page: number, size: number, search: string) {
  loadingInternal.value = true;
  return props
    .getPage({ page, size }, props.getFilter?.(search))
    .finally(() => {
      loadingInternal.value = false;
    });
}

function onScroll({ to, ref }: { to: number; ref: QSelect }) {
  const lastIndex = options.value.length - 1;

  if (
    !loadingInternal.value &&
    lastFetchedPage.value &&
    lastFetchedPage.value.number < lastFetchedPage.value.totalPages - 1 &&
    to === lastIndex
  ) {
    fetchPage(
      lastFetchedPage.value.number + 1,
      props.pageSize,
      search.value
    ).then((page) => {
      lastFetchedPage.value = page;
      options.value = options.value.concat(page.content);
      nextTick(() => {
        ref.refresh();
      });
    });
  }
}

function doRemoteFilter(
  inputValue: string,
  doneFn: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
  abortFn: () => void
) {
  return fetchPage(0, props.pageSize, inputValue)
    .then((page) => {
      lastFetchedPage.value = page;
      doneFn(() => {
        options.value = page.content;
      });
    })
    .catch((error) => {
      showErrorFromObj(error);
      abortFn();
    });
}

function getLabelFromOption(option: BaseModel): string {
  return (option as any)[props.optionLabel];
}

function doLocalFilter(
  inputValue: string,
  doneFn: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
  abortFn: () => void
) {
  if (!lastFetchedPage.value) abortFn();

  const filtered = inputValue
    ? lastFetchedPage.value!.content.filter((option) =>
        getLabelFromOption(option)
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      )
    : lastFetchedPage.value!.content;

  doneFn(() => {
    options.value = filtered;
  });
}

function onFilter(
  inputValue: string,
  doneFn: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
  abortFn: () => void
) {
  search.value = inputValue;
  options.value = [];
  if (props.getFilter || !lastFetchedPage.value) {
    lastFetchedPage.value = undefined;
    return doRemoteFilter(inputValue, doneFn, abortFn);
  }
  return doLocalFilter(inputValue, doneFn, abortFn);
}
</script>
