<template>
  <TextInput
    name="username"
    :label="$t('misc.labels.username')"
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event as string)"
    icon="person"
    :disable="disable"
    :required="required"
  />
</template>

<script setup lang="ts">
import TextInput from './TextInput.vue';

defineProps({
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
    default: false,
  },
});

defineEmits<{ 'update:model-value': string }>();
</script>
