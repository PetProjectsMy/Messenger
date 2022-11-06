import { CoreRouter } from "./router-core";
import { AppRoutesData, EnumAppRoutes } from "./app-routes";

export class PathRouter implements CoreRouter<EnumAppRoutes> {
  private routes: Record<EnumAppRoutes, Function> = {} as any;

  private routesData: Record<EnumAppRoutes, TAppRouteData>;

  private isStarted = false;

  init() {
    this.routesData = AppRoutesData;

    const { store } = window;
    Object.entries(this.routesData).forEach(
      ([routeName, routeData]: [EnumAppRoutes, TAppRouteData]) => {
        this.use(routeName, () => {
          const isAuthorized = store.isUserAthorized();
          const isPageSet = store.isPageSet();

          if (!isPageSet && this.isStarted) {
            throw new Error(
              `Unexpected state of current page: typeof page is ${store.getPageType()}`
            );
          }
          if (isAuthorized || !routeData.needAuthorization) {
            store.dispatch({ page: routeData.block });
          }
        });
      }
    );
  }

  start(startRoute: EnumAppRoutes, startPathname: string) {
    if (this.isStarted) {
      return;
    }

    window.onpopstate = () => {
      this.onRouteChange.call(this);
    };

    if (startRoute !== EnumAppRoutes.NotFound) {
      console.log(`Start: replace state to '${startPathname}'`);
      window.history.replaceState({}, "", startPathname);
    }
    this.onRouteChange(startRoute);
    this.isStarted = true;
  }

  private onRouteChange(route: EnumAppRoutes) {
    console.log(`onRouteChange`);
    // const found = Object.entries(this.routes).some(
    //   ([routeName, renderFunction]) => {
    //     if (routeName === EnumAppRoutes.NotFound) {
    //       return false;
    //     }
    //     if (route === routeName) {
    //       console.log(`${route} = ${routeName}`);
    //       renderFunction();
    //       return true;
    //     }

    //     console.log(`${route} != ${routeName}`);
    //     return false;
    //   }
    // );
    const renderFunction =
      this.routes[route] ?? this.routes[EnumAppRoutes.NotFound];
    renderFunction();

    // if (!found) {
    //   const notFoundRender = this.routes[EnumAppRoutes.NotFound];
    //   console.log(`Not found render: ${typeof notFoundRender}`);
    //   notFoundRender();
    // }
  }

  use(route: EnumAppRoutes, renderFunction: Function) {
    this.routes[route] = renderFunction;
    return this;
  }

  go(route: EnumAppRoutes) {
    window.history.pushState({}, "", AppRoutesData[route].path);
    this.onRouteChange(route);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  matchRoute(pathname: string): { route: EnumAppRoutes; path: string } {
    if (pathname === "/") {
      let route;
      if (window.store.isUserAthorized()) {
        route = EnumAppRoutes.Chats;
      } else {
        route = EnumAppRoutes.Login;
      }
      const { path } = this.routesData[route];
      return { route, path };
    }

    for (const route of Object.keys(this.routes)) {
      const { path } = this.routesData[route as EnumAppRoutes];
      if (path === pathname) {
        console.log(
          `Route matching: '${pathname}' == '${path}' of route '${route}'`
        );
        return { route, path };
      }
      console.log(
        `Route matching: '${pathname}' != '${path}' of route '${route}'`
      );
    }

    return { route: EnumAppRoutes.NotFound, path: pathname };
  }
}
