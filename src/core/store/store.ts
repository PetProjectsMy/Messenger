import { getPageComponent } from "utils/pages";
import { EnumAppPages } from "pages";
import { renderDOM } from "core/dom";
import {
  comparePropByPath,
  deepEqual,
  getPropByPath,
  isNullish,
  setPropByPath,
} from "utils/objects-handle";
import { type ChatMessagesHandler } from "services/sockets";
import { EnumStoreEvents } from "./enum-store-events";
import { EventBus } from "../event-bus";
import * as StateProxies from "./state-proxies/main-states-proxies";
import {
  stateByPathSetter,
  statePathRegex,
} from "./state-proxies/by-path-proxies";

export const defaultState: TAppState = {
  page: null,
  user: null,
  chats: null,
  chatsUsers: null,
  chatsSockets: null,
  chatsMessages: null,
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

  public chatHasMessages(chatID: string): boolean {
    const messages = this.state.chatsMessages;
    return !isNullish(messages) && Object.hasOwn(messages!, chatID);
  }

  dispatch(nextStateOrAction: Partial<TAppState> | Function) {
    if (typeof nextStateOrAction === "function") {
      nextStateOrAction();
    } else {
      this._setState(nextStateOrAction);
    }
  }

  public getStateValueByPath(pathString: string = "", doLog: boolean = false) {
    return getPropByPath(this.state, pathString, doLog);
  }

  public getUserDataByPath(pathString: string = "", doLog = false) {
    const path = `user${pathString ? "." : ""}${pathString}`;
    return this.getStateValueByPath(path, doLog);
  }

  public getUserID() {
    return this.getStateValueByPath("user.id");
  }

  public getChatsDataByPath(pathString: string = "", doLog = false) {
    const path = `chats${pathString ? "." : ""}${pathString}`;
    return this.getStateValueByPath(path, doLog);
  }

  public getCurrentChatID() {
    return this.getStateValueByPath("currentChatID");
  }

  public getPageType(): Nullable<string> {
    const { page } = this.state;
    if (!page) {
      return page;
    }

    return page.constructor.name;
  }

  public getSocketByChatID(chatID?: string, doLog = false) {
    if (chatID === undefined) {
      return this.getStateValueByPath(`chatsSockets`, doLog);
    }

    return this.getStateValueByPath(`chatsSockets.${chatID}`, doLog);
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

  public setSocketByChatID(chatID: string, socket: ChatMessagesHandler) {
    return this.setStateByPath(`chatsSockets.${chatID}`, socket, true);
  }

  private _setState(nextState: Partial<TAppState>) {
    Object.assign(this.state, nextState);
  }

  public setStateByPath(
    pathString: string,
    newValue: unknown,
    doLog: boolean = false
  ) {
    const isValueChanged = !comparePropByPath(
      this.state,
      pathString,
      newValue,
      doLog
    );

    if (!isValueChanged) {
      return;
    }

    setPropByPath(this.state, pathString, newValue, doLog);

    let match = [...pathString.matchAll(statePathRegex.ChatAvatarChange)];
    if (match.length === 1) {
      const chatID = match[0][1];
      stateByPathSetter.ChatAvatar.call(this, chatID, newValue);
      return;
    }

    match = [...pathString.matchAll(statePathRegex.ChatNewMessage)];
    if (match.length === 1) {
      const chatID = match[0][1];
      stateByPathSetter.ChatNewMessage.call(this, chatID);
    }
  }

  public userHasAnyChats(): Boolean {
    const { chats } = this.state;
    if (isNullish(chats)) {
      return false;
    }

    return Object.keys(chats!).length > 0;
  }
}
