import { transformWebsocketMessageDTOtoAppMessage } from "utils/api";
import { EnumMessageType } from "./enum-message-types";

type TConstructorArgs = {
  userID: string;
  chatID: string;
  chatToken: string;
};

export class ChatWebSocket {
  protected userID: string;

  public chatID: string;

  protected chatToken: string;

  protected socket: WebSocket;

  protected _handleMessagesArray(messagesBatch: WebSocketTypings.MessageDTO[]) {
    return;
  }

  constructor(argsObject: TConstructorArgs) {
    Object.assign(this, argsObject);
    this._createSocket();
  }

  private _createSocket() {
    const { userID, chatID, chatToken } = this;

    const socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userID}/${chatID}/${chatToken}`
    );

    this.socket = socket;
    const ping = setInterval(function () {
      socket.send(
        JSON.stringify({
          type: EnumMessageType.Ping,
        })
      );
    }, 30000);

    socket.addEventListener("close", (event) => {
      if (!event.wasClean) {
        console.log(`Chat(${chatID}) Socket Closed Clearly`);
      } else {
        console.log(
          `Chat(${chatID}) Socket Closed With Error: code ${event.code}, reason ${event.reason}`
        );
        clearInterval(ping);
      }
    });

    socket.addEventListener(
      "message",
      function (this: ChatWebSocket, event: MessageEvent) {
        let message;

        try {
          message = JSON.parse(event.data);
        } catch (err) {
          console.log(
            `ERROR ON PARSING MESSAGE ${JSON.stringify(
              message
            )} ON CHAT(${chatID}) SOCKET`
          );
          return;
        }

        if (
          message.type === EnumMessageType.Pong ||
          message.type === EnumMessageType.UserConnected
        ) {
          return;
        }
        if (Array.isArray(message)) {
          this._handleMessagesArray(message);
          return;
        }

        console.log(
          `MESSAGE OF '${message.type}' TYPE RECEIVED: '${JSON.stringify(
            message
          )}'`
        );

        message = transformWebsocketMessageDTOtoAppMessage(message);
        const messagesStatePath = `chatsMessages.${chatID}`;

        const currentMessages = window.store.chatHasMessages(chatID)
          ? window.store.getStateValueByPath(messagesStatePath)
          : [];

        window.store.setStateByPath(
          messagesStatePath,
          [message, ...currentMessages],
          true
        );
      }.bind(this)
    );

    socket.addEventListener("error", () => {
      clearInterval(ping);
    });
  }

  public send(content: string, type = EnumMessageType.Message) {
    this.socket.send(JSON.stringify({ content, type }));
  }

  public getMessagesByOffset(offset: number) {
    return this.socket.send(
      JSON.stringify({
        content: offset.toString(),
        type: EnumMessageType.GetOld,
      })
    );
  }

  public async waitSocketConnection() {
    await new Promise<void>((resolve) => {
      const awaiter = setInterval(() => {
        if (this.socket.readyState === 1) {
          resolve();
          clearInterval(awaiter);
          console.log(`SOCKET OF CHAT(${this.chatID}) CONNECTED`);
        }
      }, 50);
    });
  }
}
