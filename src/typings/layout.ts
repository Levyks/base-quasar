import { Route } from '@/enums/route';

type BaseMenuItemDefinition = {
  labelTranslationKey?: string;
  cy?: string;
  descriptionTranslationKey?: string;
  icon?: string;
};

export type FinalMenuItemDefinition = BaseMenuItemDefinition & {
  route: Route;
  children?: never;
};

export type ParentMenuItemDefinition = BaseMenuItemDefinition & {
  route: Route;
  children: MenuItemDefinition[];
};

export type MenuItemDefinition =
  | FinalMenuItemDefinition
  | ParentMenuItemDefinition
  | Route;
