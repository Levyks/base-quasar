import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { LocalStorage } from 'quasar';

export const useAuthStore = defineStore('auth', () => {
  const storedToken = LocalStorage.getItem<string>('token');

  const token = ref<string | null>(storedToken);

  const isAuthenticated = computed(() => !!token.value);
  const username = computed(() => 'Not implemented');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function login(email: string, token: string) {
    throw new Error('Not implemented');
  }

  function logout() {
    token.value = null;
  }

  watch(token, (newToken) => {
    LocalStorage.set('token', newToken);
  });

  return { token, username, isAuthenticated, login, logout };
});
