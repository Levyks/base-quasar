<template>
  <q-page class="row items-center justify-evenly" data-cy="home-page">
    <img :src="logo" />
  </q-page>
</template>

<script setup lang="ts">
import logo from '@/assets/img/The_Answer_to_Life_the_Universe_and.png';
</script>

<style lang="scss" scoped>
img {
  width: 30%;
}
</style>
