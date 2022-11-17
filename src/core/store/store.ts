import { getPageComponent } from "utils/pages";
import { EnumAppPages } from "pages";
import { renderDOM } from "core/dom";
import { deepEqual, getPropByPath, setPropByPath } from "utils/objects-handle";
import { EnumStoreEvents } from "./enum-store-events";
import { EventBus } from "../event-bus";
import * as StateProxies from "./state-proxies/main-states-proxies";

export const defaultState: TAppState = {
  page: null,
  user: null,
  chats: null,
  chatsUsers: null,
  chatsSockets: null,
  currentChatID: null,
};

type TStoreEvents = typeof EnumStoreEvents;

type TStoreEventsHandlersArgs = {
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

  dispatch(nextStateOrAction: Partial<TAppState> | Function) {
    if (typeof nextStateOrAction === "function") {
      nextStateOrAction();
    } else {
      this._setState(nextStateOrAction);
    }
  }

  private _getStateValueByPath(pathString: string = "") {
    return getPropByPath(this.state, pathString);
  }

  public getUserDataByPath(pathString: string = "") {
    const path = `user${pathString ? "." : ""}${pathString}`;
    return this._getStateValueByPath(path);
  }

  public getUserID() {
    return this._getStateValueByPath("user.id");
  }

  public getChatsDataByPath(pathString: string = "") {
    const path = `chats${pathString ? "." : ""}${pathString}`;
    return this._getStateValueByPath(path);
  }

  public getCurrentChatID() {
    return this._getStateValueByPath("currentChatID");
  }

  public getPageRef(ref: string) {
    return this.page.refs[ref];
  }

  public getPageType(): Nullable<string> {
    const { page } = this.state;
    if (!page) {
      return page;
    }

    return page.constructor.name;
  }

  public getSocketByChatID(chatID: string) {
    return this._getStateValueByPath(`chatsSockets.${chatID}`);
  }

  init() {
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

  public isPageSet(): Boolean {
    return Boolean(this.state.page);
  }

  public isUserAuthorized(): Boolean {
    return Boolean(this.state.user);
  }

  protected _makeStateProxy(state: TAppState) {
    return new Proxy(state, {
      set: function (
        target: TAppState,
        prop: Keys<TAppState>,
        newValue: unknown
      ) {
        const oldValue = target[prop];
        if (deepEqual(oldValue, newValue)) {
          return true;
        }

        (target as Record<string, unknown>)[prop] = newValue;
        console.log(
          `STORE ${prop}: ${JSON.stringify(oldValue)} -> ${JSON.stringify(
            newValue
          )}`
        );

        switch (prop) {
          case "page":
            StateProxies.pageSetter.call(this, newValue);
            break;
          case "user":
            StateProxies.userSetter.call(this, oldValue, newValue);
            break;
          case "chats":
            StateProxies.chatsSetter.call(this, oldValue, newValue);
            break;
          case "currentChatID":
            StateProxies.currentChatSetter.call(this, oldValue, newValue);
            break;
          default:
        }

        return true;
      }.bind(this),
    });
  }

  private _setState(nextState: Partial<TAppState>) {
    Object.assign(this.state, nextState);
  }

  public setStateByPath(
    pathString: string,
    value: unknown,
    afterSetCallback?: () => void
  ) {
    setPropByPath(this.state, pathString, value);
    if (afterSetCallback) {
      afterSetCallback();
    }
  }

  public userHasAnyChats(): Boolean {
    const { chats } = this.state;
    if (!chats) {
      return false;
    }

    return Object.keys(chats).length > 0;
  }
}
