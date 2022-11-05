import { CoreRouter } from "./router-core";

export class PathRouter implements CoreRouter {
  private routes: Record<string, Function> = {};

  private isStarted = false;

  start(startURL: string) {
    if (!this.isStarted) {
      this.isStarted = true;

      // window.onpopstate = () => {
      //   console.log(`onpopstate`);
      //   this.onRouteChange.call(this);
      // };

      // window.history.replaceState({}, "", startURL);
      // this.onRouteChange(startURL);
      // this.onRouteChange();
    }
  }

  private onRouteChange(pathname: string = window.location.pathname) {
    console.log(`onRouteChange`);
    const found = Object.entries(this.routes).some(
      ([routeHash, renderFunction]) => {
        if (routeHash === pathname) {
          renderFunction();
          return true;
        }

        return false;
      }
    );

    if (!found && this.routes["*"]) {
      this.routes["*"]();
    }
  }

  use(hash: string, renderFunction: Function) {
    this.routes[hash] = renderFunction;
    return this;
  }

  go(pathname: string) {
    window.history.pushState({}, "", pathname);
    // this.onRouteChange(pathname);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }
}
