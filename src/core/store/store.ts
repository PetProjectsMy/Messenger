import { renderDOM } from "core/dom";
import { EnumAppPages } from "pages/enum-app-pages";
import { type ChatMessagesHandler } from "services/sockets";
import {
  getPropByPath,
  isNullish,
  isPropByPathEqualToValue,
  setPropByPath,
} from "utils/objects-handle";
import { getPageComponent } from "utils/pages";
import { EventBus } from "../event-bus";
import { EnumStoreEvents } from "./enum-store-events";
import {
  stateByPathSetters,
  statePathRegex,
} from "./state-proxies/by-path-proxies";
import { stateMainPropsSetter } from "./state-proxies/props-setter";

export const defaultState: StoreTypings.AppState = {
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

  private state: StoreTypings.AppState;

  private _currentPageObject: PagesTypings.AppPage;

  constructor(state: StoreTypings.AppState = defaultState) {
    this.state = this._makeStateProxy(state);
  }

  public chatHasMessages(chatID: string): boolean {
    const messages = this.state.chatsMessages;
    return !isNullish(messages) && Object.hasOwn(messages, chatID);
  }

  public dispatch(
    nextStateOrAction: Partial<StoreTypings.AppState> | TFunction
  ) {
    if (typeof nextStateOrAction === "function") {
      nextStateOrAction();
    } else {
      this._setState(nextStateOrAction);
    }
  }

  public emitEvent(
    event: EnumStoreEvents,
    ...args: TStoreEventsHandlersArgs[typeof event]
  ) {
    this.eventBus.emit(event, ...args);
  }

  public getStateByPath(pathString = "", isLogNeeded = false) {
    return getPropByPath({ object: this.state, pathString, isLogNeeded });
  }

  public getUserDataByPath(pathString = "", isLogNeeded = false) {
    const path = `user${pathString ? "." : ""}${pathString}`;
    return this.getStateByPath(path, isLogNeeded);
  }

  public getUserID() {
    return this.getStateByPath("user.id");
  }

  public getChatsDataByPath(pathString = "", isLogNeeded = false) {
    const path = `chats${pathString ? "." : ""}${pathString}`;
    return this.getStateByPath(path, isLogNeeded);
  }

  public getCurrentChatID() {
    return this.getStateByPath("currentChatID") as string;
  }

  public getCurrentPageObject() {
    return this._currentPageObject;
  }

  public getCurrentPageRefs() {
    return this._currentPageObject.refs;
  }

  public getCurrentPageType(): Nullable<string> {
    return this.state.page;
  }

  public getSocketByChatID(chatID?: string, isLogNeeded = false) {
    if (chatID === undefined) {
      return this.getStateByPath(`chatsSockets`, isLogNeeded);
    }

    return this.getStateByPath(`chatsSockets.${chatID}`, isLogNeeded);
  }

  init() {
    this.eventBus.on(
      EnumStoreEvents.PageChanged,
      function (this: Store, newPageType: EnumAppPages) {
        const PageComponent = getPageComponent(newPageType);
        const newPageObject = new PageComponent();
        this._currentPageObject = newPageObject;
        renderDOM({ component: newPageObject });
        document.title = `App / ${newPageObject.componentName}`;
        console.log(`Store event '${EnumStoreEvents.PageChanged}' emitted`);
      }.bind(this)
    );
  }

  public isPageSet(): boolean {
    return Boolean(this.state.page);
  }

  public isUserAuthorized(): boolean {
    return Boolean(this.state.user);
  }

  protected _makeStateProxy(state: StoreTypings.AppState) {
    const propsSetter = stateMainPropsSetter.bind(this);

    return new Proxy(state, {
      set: propsSetter,
    });
  }

  public setSocketByChatID(chatID: string, socket: ChatMessagesHandler) {
    return this.setStateByPath(`chatsSockets.${chatID}`, socket, true);
  }

  private _setState(nextState: Partial<StoreTypings.AppState>) {
    Object.assign(this.state, nextState);
  }

  // TODO: move all regex setters to distinct module
  public setStateByPath(
    pathString: string,
    value: unknown,
    isLogNeeded = false
  ) {
    const isValueChanged = !isPropByPathEqualToValue({
      object: this.state,
      pathString,
      value,
      isLogNeeded,
    });

    if (!isValueChanged) {
      return;
    }

    setPropByPath({ object: this.state, pathString, value, isLogNeeded });

    let match = [...pathString.matchAll(statePathRegex.ChatAvatarChange)];
    if (match.length === 1) {
      const chatID = match[0][1];
      stateByPathSetters.setChatAvatar.call(this, chatID, value);
      return;
    }

    match = [...pathString.matchAll(statePathRegex.ChatNewMessage)];
    if (match.length === 1) {
      const chatID = match[0][1];
      stateByPathSetters.setChatNewMessage.call(this, chatID);
    }
  }

  public userHasAnyChats(): boolean {
    const { chats } = this.state;
    if (isNullish(chats)) {
      return false;
    }

    return Object.keys(chats).length > 0;
  }
}
