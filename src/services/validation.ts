import { ValidationRule } from 'quasar';
import { useI18n } from 'vue-i18n';

export function createDefaultRequiredRule(): ValidationRule {
  const { t } = useI18n();
  return (val: string) => (val ? true : t('misc.validation.required'));
}

export function createDefaultRequiredRuleMultiple(): ValidationRule {
  const { t } = useI18n();
  return (val: string) =>
    val && val.length > 0 ? true : t('misc.validation.requiredMultiple');
}

export function createEmailRule(): ValidationRule {
  const { t } = useI18n();
  const regex =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return (val: string) => regex.test(val) || t('misc.validation.email');
}

export function createPasswordConfirmationRule(
  password?: string
): ValidationRule {
  const { t } = useI18n();
  return (val: string) =>
    val === password || t('misc.validation.passwordConfirmation');
}
