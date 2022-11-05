import { boot } from 'quasar/wrappers';

import { showError } from '@/services/notification';
import { getMessageFromError } from '../services/errorHandling';

// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(() => {
  window.onunhandledrejection = (rejection: PromiseRejectionEvent) =>
    showError(getMessageFromError(rejection.reason));
});
