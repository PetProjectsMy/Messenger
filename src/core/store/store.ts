import { renderDOM } from "core/dom";
import { EnumAppPages } from "pages/enum-app-pages";
import { type ChatMessagesHandler } from "services/sockets";
import {
  comparePropByPath,
  getPropByPath,
  isNullish,
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

  public getStateValueByPath(pathString = "", doLog = false) {
    return getPropByPath(this.state, pathString, doLog);
  }

  public getUserDataByPath(pathString = "", doLog = false) {
    const path = `user${pathString ? "." : ""}${pathString}`;
    return this.getStateValueByPath(path, doLog);
  }

  public getUserID() {
    return this.getStateValueByPath("user.id");
  }

  public getChatsDataByPath(pathString = "", doLog = false) {
    const path = `chats${pathString ? "." : ""}${pathString}`;
    return this.getStateValueByPath(path, doLog);
  }

  public getCurrentChatID() {
    return this.getStateValueByPath("currentChatID") as string;
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

  public getSocketByChatID(chatID?: string, doLog = false) {
    if (chatID === undefined) {
      return this.getStateValueByPath(`chatsSockets`, doLog);
    }

    return this.getStateValueByPath(`chatsSockets.${chatID}`, doLog);
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

  public setStateByPath(pathString: string, newValue: unknown, doLog = false) {
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
      stateByPathSetters.setChatAvatar.call(this, chatID, newValue);
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
