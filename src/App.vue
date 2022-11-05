<template>
  <router-view v-if="messagesLoaded" data-cy="lang-loaded" />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
const i18n = useI18n();
const messagesLoaded = computed(() => {
  const localeMessages = i18n.messages.value[i18n.locale.value] || {};
  return Object.keys(localeMessages).length > 0;
});
</script>
