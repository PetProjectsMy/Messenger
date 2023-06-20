export interface IRouter<EnumAppRoutes> {
  init(...args: unknown[]): void;

  start(...args: unknown[]): void;

  use(route: EnumAppRoutes, renderFunction: TFunction): IRouter<EnumAppRoutes>;

  go(route: EnumAppRoutes): void;

  back(): void;

  forward(): void;

  matchRouteByPath(pathname: string): {
    route: EnumAppRoutes;
    path: string;
  };
}
