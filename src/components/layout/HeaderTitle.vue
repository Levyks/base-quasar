<template>
  <q-toolbar-title>
    <router-link
      :to="Route.Home.toLocation()"
      class="q-mr-xs seamless-link"
      active-class=""
      exact-active-class=""
    >
      <q-avatar square size="md" class="q-mr-sm">
        <img :src="logoReduced" />
      </q-avatar>
      {{ productName }}
    </router-link>
    <span class="text-caption">v{{ version }}</span>
  </q-toolbar-title>
</template>

<script setup lang="ts">
import { version, productName } from 'app/package.json';
import logoReduced from '@/assets/img/The_Answer_to_Life_the_Universe_and.png';
import { Route } from '@/enums/route';
</script>
