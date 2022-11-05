import { PartialRouteName, RouteName } from '@/enums/RouteName';

type BaseMenuItemDefinition = {
  labelTranslationKey?: string;
  cy?: string;
  descriptionTranslationKey?: string;
  icon?: string;
};

export type FinalMenuItemDefinition = BaseMenuItemDefinition & {
  route: RouteName;
  children?: never;
};

export type ParentMenuItemDefinition = BaseMenuItemDefinition & {
  route: PartialRouteName;
  children: MenuItemDefinition[];
};

export type MenuItemDefinition =
  | FinalMenuItemDefinition
  | ParentMenuItemDefinition
  | RouteName;
