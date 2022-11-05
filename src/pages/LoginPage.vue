<template>
  <q-page class="row justify-center items-center">
    <q-card
      bordered
      class="q-ma-sm"
      style="width: min(500px, 100%)"
      data-cy="login-card"
    >
      <q-form @submit="onSubmit">
        <q-card-section class="bg-dark text-white">
          <div class="text-h6">{{ $t('login.title') }}</div>
        </q-card-section>

        <q-card-section>
          <EmailInput
            v-model="email"
            :disable="loading"
            data-cy="login-email-input"
            required
          />
          <PasswordInput
            v-model="password"
            :disable="loading"
            data-cy="login-password-input"
            required
          />
        </q-card-section>

        <q-card-actions class="q-px-lg">
          <q-btn
            unelevated
            size="lg"
            color="primary"
            class="full-width"
            type="submit"
            :loading="loading"
            :label="$t('login.submit')"
            data-cy="login-submit"
          />
        </q-card-actions>

        <q-card-section class="text-center q-pa-sm q-mb-lg">
          <router-link to="#" class="text-grey-8">{{
            $t('login.forgotPassword')
          }}</router-link>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { QForm } from 'quasar';

import { useAuthStore } from '@/stores/auth';
import { Route } from '@/enums/route';

import EmailInput from '@/components/form/EmailInput.vue';
import PasswordInput from '@/components/form/PasswordInput.vue';

const router = useRouter();
const authStore = useAuthStore();

const email = ref<string>('');
const password = ref<string>('');
const loading = ref(false);

function getRouteToPush() {
  const url = new URL(window.location.href);
  const goto = url.searchParams.get('goto');
  return goto
    ? {
        path: goto,
      }
    : {
        name: RouteName.Home,
      };
}

function onSubmit() {
  // Just to avoid a null-check down below
  if (!email.value || !password.value) return;
  loading.value = true;
  authStore
    .login(email.value, password.value)
    .then(() => router.push(getRouteToPush()))
    .finally(() => {
      loading.value = false;
    });
}
</script>
