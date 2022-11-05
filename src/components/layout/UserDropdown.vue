<template>
  <q-btn-dropdown
    color="primary"
    icon="person"
    :label="authStore.username"
    data-cy="logged-user"
  >
    <q-list>
      <q-item
        clickable
        v-close-popup
        :to="{ name: RouteName.Profile }"
        data-cy="profile-button"
      >
        <q-item-section avatar>
          <q-icon color="primary" name="badge" size="sm" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ $t('layout.navbar.profile') }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup @click="logout" data-cy="logout-button">
        <q-item-section avatar>
          <q-icon color="primary" name="logout" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ $t('layout.navbar.logout') }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { RouteName } from '@/enums/RouteName';

const router = useRouter();
const authStore = useAuthStore();

function logout() {
  authStore.logout();
  router.push({ name: RouteName.Login });
}
</script>
