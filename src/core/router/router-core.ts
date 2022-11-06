export interface CoreRouter<EnumAppRoutes> {
  init(...args: unknown[]): void;

  start(...args: unknown[]): void;

  use(
    route: EnumAppRoutes,
    renderFunction: Function
  ): CoreRouter<EnumAppRoutes>;

  go(route: EnumAppRoutes): void;

  back(): void;

  forward(): void;

  matchRoute(pathname: string): { route: EnumAppRoutes; path: string };
}
