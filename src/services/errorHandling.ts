import { i18n } from '@/boot/i18n';
import { OverriddenAxiosError } from '@/typings/axios';

export class AppException extends Error {
  constructor(public translationKey: string) {
    super(translationKey);
  }
}

function getMessageFromAxiosError(error: OverriddenAxiosError): string {
  if (error.userFriendlyMessage) {
    return error.userFriendlyMessage;
  }

  const translationKey = `misc.errors.http.${error.response?.status}`;

  return i18n.global.t(
    i18n.global.te(translationKey)
      ? translationKey
      : 'misc.errors.unknownRequestError'
  );
}

export function getMessageFromError(error: any): string {
  if (error instanceof AppException) {
    return i18n.global.t(error.translationKey);
  }

  if (error.isAxiosError)
    return getMessageFromAxiosError(error as OverriddenAxiosError);

  return i18n.global.t('misc.errors.unknownError');
}
