<template>
  <span class="block q-mb-xs"
    >{{ label }}:
    <strong data-cy="lv-value" style="overflow-wrap: break-word">{{
      /**
       * Replacing hyphens with word joiner unicode character to avoid line breaks to appear in a non uniform way.
       *
       * https://stackoverflow.com/questions/7691569/no-line-break-after-a-hyphen
       */
      value && value.replace(/-/gm, '-\u2060')
    }}</strong></span
  >
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  value?: string;
}>();
</script>
