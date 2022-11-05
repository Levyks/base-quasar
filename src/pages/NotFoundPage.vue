<template>
  <q-page class="row justify-center items-center">
    <q-card
      bordered
      class="bg-blue text-white q-ma-sm"
      style="width: min(500px, 100%)"
      data-cy="not-found-card"
    >
      <q-card-section class="bg-dark">
        <div class="text-h6">{{ $t('notFound.title') }}</div>
      </q-card-section>

      <q-card-section class="text-center">
        <div style="font-size: 8rem">404</div>

        <div class="text-h4" style="opacity: 0.8">
          {{ $t('notFound.oops') }}
        </div>
      </q-card-section>

      <q-card-actions class="q-px-lg">
        <q-btn
          unelevated
          size="lg"
          color="black"
          class="full-width"
          :to="Route.Home.toLocation()"
          :label="$t('notFound.goHome')"
          data-cy="not-found-go-home-button"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { Route } from '@/enums/route';
</script>
