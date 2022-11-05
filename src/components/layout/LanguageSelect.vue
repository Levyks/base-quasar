<template>
  <q-select
    :model-value="currentLocale"
    :options="languages"
    borderless
    dense
    emit-value
    map-options
    :loading="loading"
    @update:model-value="onLanguageChange"
    data-cy="lang-select"
  >
    <template v-slot:selected-item="scope">
      <img class="flag" data-cy="lang-flag" :src="scope.opt.flag" />
    </template>
    <template v-slot:option="scope">
      <q-item
        v-bind="scope.itemProps"
        :data-cy="`lang-option-${scope.opt.value}`"
      >
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <img class="flag" :src="scope.opt.flag" />
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import flagEn from '@/assets/img/languages/en.svg';
import flagPtBr from '@/assets/img/languages/pt-BR.svg';
import { useI18n } from 'vue-i18n';
import { loadAndUpdateLocale } from '@/boot/i18n';

const i18n = useI18n();
const currentLocale = ref(i18n.locale);

const loading = ref(false);

function onLanguageChange(value: string) {
  loading.value = true;

  loadAndUpdateLocale(value).finally(() => {
    loading.value = false;
  });
}

const languages = computed(() => [
  {
    value: 'en',
    label: 'English',
    flag: flagEn,
  },
  {
    value: 'pt-BR',
    label: 'Português',
    flag: flagPtBr,
  },
]);
</script>

<style scoped lang="scss">
.flag {
  width: 30px;
  height: 20px;
  object-fit: cover;
}

.q-select {
  :deep(.q-field__native) {
    padding: 0;
  }

  :deep(.q-field__control),
  :deep(.q-field__native),
  :deep(.q-field__marginal) {
    height: auto;
    min-height: auto;
  }
}
</style>
