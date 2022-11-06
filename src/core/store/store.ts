import { getPageComponent } from "utils/get-page-component";
import { EnumAppPages } from "utils/enums";
import { renderDOM } from "core/dom";
import { EnumAppRoutes } from "core/router";
import EventBus from "../event-bus";

export const defaultState: TAppState = {
  appIsInited: false,
  isLoading: false,
  page: null,
  loginFormError: null,
  user: null,
};

export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | Action<State>,
  payload?: any
) => void;

export type Action<State> = (
  dispatch: Dispatch<State>,
  state: State,
  payload: any
) => void;

export const enum EnumStoreEvents {
  PageChanged = "changed",
  AppInit = "appInit",
}

type TStoreEvents = typeof EnumStoreEvents;

type EventHanlderArgs = {
  [EnumStoreEvents.AppInit]: [EnumAppRoutes, string];
  [EnumStoreEvents.PageChanged]: [EnumAppPages];
};

export class Store<State extends Record<string, any>> {
  private eventBus = new EventBus<TStoreEvents, EventHanlderArgs>();

  private state: State;

  constructor(state: State = defaultState as unknown as State) {
    this.state = this._makeStateProxy(state);
  }

  protected _makeStateProxy(store: State) {
    return new Proxy(store, {
      get(target, prop: string) {
        const value = target[prop];
        return value;
      },

      set: function (target: State, prop: string, newValue: unknown) {
        const oldValue = target[prop];
        (target as Record<string, unknown>)[prop] = newValue;
        console.log(`${prop}: ${oldValue} -> ${newValue}`);

        if (prop === "appIsInited") {
          if (!oldValue && newValue) {
            let startPathname = window.location.pathname;
            console.log(`Router starts on window path '${startPathname}'`);
            const matchingRoute = window.router.matchRoute(startPathname);
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

  public getPageType(): null | TAppPageClass {
    const { page } = this.state;
    if (!page) {
      return page;
    }
    return page.constructor.name;
  }

  public set(nextState: Partial<State>) {
    console.log(`${"-".repeat(30)}\nold state: ${JSON.stringify(this.state)}`);
    console.log(`props to change: ${JSON.stringify(nextState)}`);
    Object.assign(this.state, nextState);
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
    if (typeof nextStateOrAction === "function") {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set({ ...nextStateOrAction });
    }
  }

  init() {
    this.eventBus.on(
      EnumStoreEvents.AppInit,
      (startRoute: EnumAppRoutes, startPathname) => {
        window.router.start(startRoute, startPathname);
      }
    );

    this.eventBus.on(EnumStoreEvents.PageChanged, (newPage: EnumAppPages) => {
      const PageComponent = getPageComponent(newPage);
      const page = new PageComponent();
      renderDOM({ component: page });
      document.title = `App / ${page.componentName}`;
    });
  }
}
