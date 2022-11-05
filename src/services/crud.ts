import { i18n } from '@/boot/i18n';
import { yesOrNoConfirm } from './dialog';
import { showError, showLoading, showSuccess } from './notification';
import { ConfirmAndDeleteOptions } from '@/typings/crud';

export async function confirmAndDelete({
  title,
  message,
  loadingMessage,
  successMessage,
  errorMessage,
  deleteFn,
  onSuccess,
  onError,
}: ConfirmAndDeleteOptions) {
  title = title ?? i18n.global.t('misc.dialog.delete.title');
  message = message ?? i18n.global.t('misc.dialog.delete.message');

  const confirmed = await yesOrNoConfirm(title, message, 'bg-negative');
  if (!confirmed) return;

  const dismiss = showLoading(
    loadingMessage ?? i18n.global.t('misc.dialog.delete.loading')
  );
  return deleteFn()
    .then(() => {
      showSuccess(
        successMessage ?? i18n.global.t('misc.dialog.delete.success')
      );
      onSuccess?.();
    })
    .catch((error) => {
      showError(errorMessage ?? i18n.global.t('misc.dialog.delete.error'));
      onError?.();
      console.error('Error deleting item', error);
    })
    .finally(() => dismiss());
}
