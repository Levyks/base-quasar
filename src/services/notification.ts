import { Notify } from 'quasar';
import { getMessageFromError } from './errorHandling';

export function showError(message: string) {
  Notify.create({
    type: 'negative',
    message: message,
    position: 'bottom-right',
    actions: [
      {
        icon: 'close',
        color: 'white',
      },
    ],
  });
}

export function showErrorFromObj(error: any) {
  Notify.create({
    type: 'negative',
    message: getMessageFromError(error),
    position: 'bottom-right',
    actions: [
      {
        icon: 'close',
        color: 'white',
      },
    ],
  });
}

export function showSuccess(message: string) {
  Notify.create({
    type: 'positive',
    message: message,
    position: 'bottom-right',
    actions: [
      {
        icon: 'close',
        color: 'white',
      },
    ],
  });
}

export function showLoading(message: string) {
  return Notify.create({
    message,
    timeout: 0,
    color: 'primary',
    icon: 'cloud_upload',
    position: 'bottom-right',
  });
}
