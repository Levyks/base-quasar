<template>
  <q-card class="column" :class="{ 'col-grow': props.grow }">
    <q-card-section v-if="props.title">
      <h4 class="q-my-sm">{{ props.title }}</h4>
    </q-card-section>

    <q-card-section
      v-if="props.loading"
      class="col-grow row justify-center items-center"
    >
      <q-spinner class="q-mx-auto" size="12rem" :thickness="1.5" />
    </q-card-section>
    <slot v-else></slot>
  </q-card>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  grow: {
    type: Boolean,
    default: true,
  },
});
</script>
