<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event as string)"
    :name="name"
    :label="label"
    class="q-mb-sm"
    :rules="required ? [createDefaultRequiredRule()] : []"
    :disable="disable"
  >
    <template v-slot:prepend v-if="icon">
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { createDefaultRequiredRule } from '@/services/validation';

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    required: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

defineEmits<{ 'update:model-value': string }>();
</script>
