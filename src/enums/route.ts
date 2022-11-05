import { Ref } from 'vue';
import { keyTranslatedRef as t } from 'app/src/services/i18n';
import { RouteLocationRaw } from 'vue-router';

export class Route {
  static readonly Home = new Route('Home', t('routes.home'), 'home');
  static readonly Profile = new Route('Profile', t('routes.profile'), 'person');
  static readonly Login = new Route('Login', t('routes.login'), 'login');
  static readonly NotFound = new Route(
    'NotFound',
    t('routes.notFound'),
    'error'
  );

  static fromName(name: keyof typeof Route): Route {
    const route = Route[name];
    if (!(route instanceof Route))
      throw new Error(`Route with name "${name}" not found`);
    return route;
  }

  protected constructor(
    public readonly name: string,
    public readonly label: Ref<string>,
    public readonly icon: string | undefined,
    public readonly description?: Ref<string>
  ) {}

  toLocation(query?: Record<string, string>): RouteLocationRaw {
    return { name: this.name, query };
  }
}
