import { Dialog, QDialogOptions } from 'quasar';
import { i18n } from '@/boot/i18n';

export function showDialogPromise(options: QDialogOptions): Promise<boolean> {
  return new Promise((resolve) => {
    Dialog.create(options)
      .onOk(() => resolve(true))
      .onCancel(() => resolve(false));
  });
}

export function yesOrNoConfirm(
  title: string,
  message: string,
  yesClass = 'bg-positive',
  noClass = 'bg-secondary'
): Promise<boolean> {
  return showDialogPromise({
    title,
    message,
    ok: {
      class: yesClass,
      label: i18n.global.t('misc.yes'),
    },
    cancel: {
      class: noClass,
      label: i18n.global.t('misc.no'),
    },
  });
}
