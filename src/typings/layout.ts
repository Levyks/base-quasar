import { Route } from '@/enums/route';
import { Ref } from 'vue';

type BaseMenuItemDefinition = {
  label?: Ref<string>;
  cy?: string;
  description?: Ref<string>;
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
