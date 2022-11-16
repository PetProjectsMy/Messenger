import { getPageComponent } from "utils/pages";
import { EnumAppPages } from "pages";
import { renderDOM } from "core/dom";
import { EnumAppRoutes } from "core/router";
import { getPropByPath, setPropByPath } from "utils/objects-handle";
import { EnumStoreEvents } from "./enum-store-events";
import { EventBus } from "../event-bus";
import * as StateProxies from "./state-proxies";

export const defaultState: TAppState = {
  appIsInited: false,
  page: null,
  user: null,
  chats: null,
  currentChatID: null,
};

type TStoreEvents = typeof EnumStoreEvents;

type TStoreEventsHandlersArgs = {
  [EnumStoreEvents.AppInit]: [{ route: EnumAppRoutes; path: string }];
  [EnumStoreEvents.PageChanged]: [EnumAppPages];
};

export class Store {
  private eventBus = new EventBus<TStoreEvents, TStoreEventsHandlersArgs>();

  private state: TAppState;

  // @ts-ignore 'page' is declared but its value is never read
  private page: TAppPage;

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
          `STORE ${prop}: ${JSON.stringify(oldValue)} -> ${JSON.stringify(
            newValue
          )}`
        );

        switch (prop) {
          case "appIsInited":
            StateProxies.appIsInitedSetter.call(this, oldValue, newValue);
            break;
          case "page":
            StateProxies.pageSetter.call(this, oldValue, newValue);
            break;
          case "user":
            StateProxies.userSetter.call(this, oldValue, newValue);
            break;
          case "currentChatID":
            StateProxies.currentChatSetter.call(this, oldValue, newValue);
            break;
          default:
        }

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

  private _getStateValueByPath(pathString: string = "") {
    return getPropByPath(this.state, pathString);
  }

  public getUserDataByPath(pathString: string = "") {
    const path = `user${pathString ? "." : ""}${pathString}`;
    return this._getStateValueByPath(path);
  }

  public getCurrentChatID() {
    return this._getStateValueByPath("currentChatID");
  }

  public getChatsDataByPath(pathString: string = "") {
    const path = `chats${pathString ? "." : ""}${pathString}`;
    return this._getStateValueByPath(path);
  }

  public getPageType(): Nullable<string> {
    const { page } = this.state;
    if (!page) {
      return page;
    }

    return page.constructor.name;
  }

  public getPageRef(ref: string) {
    return this.page.refs[ref];
  }

  private _setState(nextState: Partial<TAppState>) {
    Object.assign(this.state, nextState);
  }

  public setStateByPath({
    pathString,
    value,
    afterSetCallback,
  }: {
    pathString: string;
    value: unknown;
    afterSetCallback?: () => void;
  }) {
    setPropByPath(this.state, pathString, value);
    if (afterSetCallback) {
      afterSetCallback();
    }
  }

  dispatch(nextStateOrAction: Partial<TAppState> | Function) {
    if (typeof nextStateOrAction === "function") {
      nextStateOrAction();
    } else {
      this._setState(nextStateOrAction);
    }
  }

  init() {
    this.eventBus.on(
      EnumStoreEvents.AppInit,
      ({ route, path }: { route: EnumAppRoutes; path: string }) => {
        window.router.start(route, path);
        console.log(`Store event '${EnumStoreEvents.AppInit}' emitted`);
      }
    );

    this.eventBus.on(
      EnumStoreEvents.PageChanged,
      function (newPage: EnumAppPages) {
        const PageComponent = getPageComponent(newPage);
        const page = new PageComponent();
        this.page = page;
        renderDOM({ component: page });
        document.title = `App / ${page.componentName}`;
        console.log(`Store event '${EnumStoreEvents.PageChanged}' emitted`);
      }.bind(this)
    );
  }
}
