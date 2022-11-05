<template>
  <q-input
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event as string)"
    :name="name || 'password'"
    :type="showPassword ? 'text' : 'password'"
    :label="label || $t('misc.labels.password')"
    :hint="hint"
    class="q-mb-sm q-field--with-bottom"
    lazy-rules
    :rules="rulesComputed"
    :disable="disable"
  >
    <template v-slot:prepend>
      <q-icon name="lock" />
    </template>
    <template v-if="allowShowPassword" v-slot:append>
      <q-icon
        :name="showPassword ? 'visibility_off' : 'visibility'"
        @click="showPassword = !showPassword"
        class="cursor-pointer"
      />
    </template>
    <slot></slot>
  </q-input>
</template>

<script setup lang="ts">
import { ValidationRule } from 'quasar';
import { createDefaultRequiredRule } from '@/services/validation';
import { computed, ref } from 'vue';
const props = defineProps<{
  allowShowPassword?: boolean;
  label?: string;
  name?: string;
  hint?: string;
  modelValue?: string;
  rules?: ValidationRule[];
  required?: boolean;
  disable?: boolean;
}>();
const emit = defineEmits(['update:modelValue']);
let showPassword = ref(false);
const rulesComputed = computed(() => {
  if (!props.required && !props.modelValue) return [];
  const rulesArray = [createDefaultRequiredRule()];
  if (props.rules?.length) return rulesArray.concat(props.rules);
  return rulesArray;
});
</script>
