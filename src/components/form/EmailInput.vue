<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event as string)"
    name="email"
    type="email"
    :label="$t('misc.labels.email')"
    class="q-mb-sm"
    lazy-rules
    :rules="rules"
    :disable="disable"
  >
    <template v-slot:prepend>
      <q-icon name="email" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import {
  createDefaultRequiredRule,
  createEmailRule,
} from '@/services/validation';
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  disable: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: true,
  },
});

defineEmits<{ 'update:model-value': string }>();

const rules = computed(() => {
  const r = props.required ? [createDefaultRequiredRule()] : [];

  return r.concat(createEmailRule());
});
</script>
