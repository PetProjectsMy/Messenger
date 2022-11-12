import { getPageComponent, EnumAppPages } from "utils/pages";
import { renderDOM } from "core/dom";
import { EnumAppRoutes } from "core/router";
import { EventBus } from "../event-bus";

export const defaultState: TAppState = {
  appIsInited: false,
  page: null,
  user: null,
  chats: null,
};

export const enum EnumStoreEvents {
  PageChanged = "page changed",
  AppInit = "appInit",
}

type TStoreEvents = typeof EnumStoreEvents;

type TBlockCommonEventsHandlersArgs = {
  [EnumStoreEvents.AppInit]: [EnumAppRoutes, string];
  [EnumStoreEvents.PageChanged]: [EnumAppPages];
};

export class Store {
  private eventBus = new EventBus<
    TStoreEvents,
    TBlockCommonEventsHandlersArgs
  >();

  private state: TAppState;

  constructor(state: TAppState = defaultState) {
    this.state = this._makeStateProxy(state);
  }

  protected _makeStateProxy(state: TAppState) {
    return new Proxy(state, {
      get(target, prop: Keys<TAppState>) {
        return target[prop];
      },

      set: function (
        target: TAppState,
        prop: Keys<TAppState>,
        newValue: unknown
      ) {
        const oldValue = target[prop];
        (target as Record<string, unknown>)[prop] = newValue;
        console.log(
          `${prop}: ${JSON.stringify(oldValue)} -> ${JSON.stringify(newValue)}`
        );

        if (prop === "appIsInited") {
          if (!oldValue && newValue) {
            let startPathname = window.location.pathname;
            console.log(`Router starts on window path '${startPathname}'`);
            const matchingRoute = window.router.matchRouteByPath(startPathname);
            const startRoute = matchingRoute.route;
            startPathname = matchingRoute.path;
            console.log(
              `Start route is '${startRoute}' on path '${startPathname}'`
            );
            this.eventBus.emit(
              EnumStoreEvents.AppInit,
              startRoute,
              startPathname
            );
          }
        } else if (prop === "page") {
          if (oldValue !== newValue) {
            if (!newValue) {
              throw new Error(
                `Incorrect app page ${newValue} of type ${typeof newValue} of store next state page`
              );
            }

            this.eventBus.emit(
              EnumStoreEvents.PageChanged,
              newValue as EnumAppPages
            );
          }
        }

        console.log(
          `new state: ${JSON.stringify(this.state)}\n${"+".repeat(30)}\n`
        );
        return true;
      }.bind(this),

      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  public isPageSet(): Boolean {
    return Boolean(this.state.page);
  }

  public isUserAthorized(): Boolean {
    return Boolean(this.state.user);
  }

  public userHasAnyChats(): Boolean {
    const { chats } = this.state;
    if (!chats) {
      return false;
    }

    return Object.keys(chats).length > 0;
  }

  public getUserData(dataType?: Keys<TAppUserData>) {
    if (dataType) {
      const userData = this.state.user;
      return userData ? userData[dataType] : userData;
    }

    return this.state.user;
  }

  public getPageType(): Nullable<string> {
    const { page } = this.state;
    if (!page) {
      return page;
    }

    return page.constructor.name;
  }

  private setState(nextState: Partial<TAppState>) {
    console.log(`${"-".repeat(30)}\nold state: ${JSON.stringify(this.state)}`);
    console.log(`props to change: ${JSON.stringify(nextState)}`);
    Object.assign(this.state, nextState);
  }

  dispatch(nextStateOrAction: Partial<TAppState> | Function) {
    if (typeof nextStateOrAction === "function") {
      nextStateOrAction();
    } else {
      this.setState(nextStateOrAction);
    }
  }

  init() {
    this.eventBus.on(
      EnumStoreEvents.AppInit,
      (startRoute: EnumAppRoutes, startPathname) => {
        window.router.start(startRoute, startPathname);
        console.log(`Store event '${EnumStoreEvents.AppInit}' emitted`);
      }
    );

    this.eventBus.on(
      EnumStoreEvents.PageChanged,
      function (newPage: EnumAppPages) {
        const PageComponent = getPageComponent(newPage);
        const page = new PageComponent();
        renderDOM({ component: page });
        document.title = `App / ${page.componentName}`;
        console.log(`Store event '${EnumStoreEvents.PageChanged}' emitted`);
      }
    );
  }
}
