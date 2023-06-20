import {
  EnumMessageType,
  EnumSocketEvents,
  type TConstructorArgs,
} from "./typings";

export class ChatWebSocket {
  protected userID: string;

  public chatID: string;

  protected chatToken: string;

  protected socket: WebSocket;

  constructor(argsObject: TConstructorArgs) {
    const { userID, chatID, chatToken } = argsObject;
    Object.assign(this, argsObject);

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
    }, 5000);

    socket.addEventListener(EnumSocketEvents.Close, (event) => {
      if (!event.wasClean) {
        console.log(`Chat(${chatID}) Socket Closed Clearly`);
      } else {
        console.log(
          `Chat(${chatID}) Socket Closed With Error: code ${event.code}, reason ${event.reason}`
        );
      }

      clearInterval(ping);
    });
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
