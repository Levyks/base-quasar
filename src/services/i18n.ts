import { computed } from 'vue';
import { i18n } from '@/boot/i18n';

export function keyTranslatedRef(key: string) {
  return computed(() => i18n.global.t(key));
}

export function getEnumFilterListFromSearch<
  Enum extends { [key: number]: string }
>(
  e: Enum,
  enumTranslationKeys: Record<string, string>,
  search?: string
): Enum[keyof Enum][] {
  if (!search?.trim()) return [];
  return Object.keys(e).filter((key) => {
    return i18n.global
      .t(enumTranslationKeys[key])
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
  }) as Enum[keyof Enum][];
}
