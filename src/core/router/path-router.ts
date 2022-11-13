import { CoreRouter } from "./router-core";
import { AppRoutesData, EnumAppRoutes, MapPathToRoute } from "./app-routes";

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
          if (store.isUserAthorized() || !routeData.needAuthorization) {
            store.dispatch({ page: routeData.block });
          } else {
            store.dispatch({
              page: this.routesData[EnumAppRoutes.NotAuthorized].block,
            });
          }
        });
      }
    );
  }

  start(startRoute: EnumAppRoutes, startPathname: string) {
    if (this.isStarted) {
      return;
    }

    console.log(`Router starts on window path '${window.location.pathname}'`);
    console.log(`Start route is '${startRoute}' on path '${startPathname}'`);
    if (startRoute !== EnumAppRoutes.NotFound) {
      window.history.replaceState({}, "", startPathname);
      console.log(`Router Start: replace state to '${startPathname}'`);
    }
    this.onRouteChange(startRoute);

    window.onpopstate = function () {
      const currentPath = this.getCurrentPath();
      console.log(`ONPOPSTATE: ${currentPath}`);
      const { route } = this.matchRouteByPath(currentPath);
      this.onRouteChange.call(this, route);
    }.bind(this);

    this.isStarted = true;
  }

  private onRouteChange(route: EnumAppRoutes) {
    console.log(`onRouteChange ('${route}' route)`);
    const renderFunction =
      this.routes[route] ?? this.routes[EnumAppRoutes.NotFound];
    renderFunction();
  }

  use(route: EnumAppRoutes, renderFunction: Function) {
    this.routes[route] = renderFunction;
    return this;
  }

  go(route: EnumAppRoutes) {
    console.log(`Go to route '${route}'`);
    const { path } = this.routesData[route];
    window.history.pushState({}, "", path);
    console.log(`Go: state pushed to ${path}'`);
    this.onRouteChange(route);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  matchRouteByPath(pathname: string): {
    route: EnumAppRoutes;
    path: string;
  } {
    if (pathname === "/") {
      let route;
      if (window.store.isUserAthorized()) {
        route = EnumAppRoutes.Chats;
      } else {
        route = EnumAppRoutes.Login;
      }
      const path = this.routesData[route].path as string;
      return { route, path };
    }

    let route = MapPathToRoute[pathname];
    if (route) {
      console.log(`pathname "${pathname}" matches "${route}" route`);
    } else {
      console.log(`no routes matching pathname "${pathname}"`);
      route = EnumAppRoutes.NotFound;
    }
    return { route, path: pathname };
  }

  getPathByRoute(route: EnumAppRoutes) {
    return this.routesData[route].path;
  }

  getCurrentPath() {
    return window.location.pathname;
  }
}
