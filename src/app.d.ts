import { LocalStorage } from 'quasar';

declare global {
  interface Window {
    Cypress?: any; // How do we import the correct type here?
    QLocalStorage?: LocalStorage;
  }
}

export {};
