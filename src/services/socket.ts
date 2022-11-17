export class ChatWebSocket {
  private userID: string;

  private chatID: string;

  private chatToken: string;

  private socket: WebSocket;

  constructor({
    userID,
    chatID,
    chatToken,
  }: {
    userID: string;
    chatID: string;
    chatToken: string;
  }) {
    this.userID = userID;
    this.chatID = chatID;
    this.chatToken = chatToken;
    this.socket = this._createSocket();
  }

  private _createSocket(): WebSocket {
    const { userID, chatID, chatToken } = this;

    const socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userID}/${chatID}/${chatToken}`
    );

    const ping = setInterval(function () {
      socket.send(
        JSON.stringify({
          type: "ping",
        })
      );
    }, 20000);

    socket.addEventListener("close", (event) => {
      if (!event.wasClean) {
        console.log(`Chat(${chatID}) Socket Closed Clearly`);
      } else {
        console.log(
          `Chat(${chatID}) Socket Closed With Error: code ${event.code}, reason ${event.reason}`
        );
      }
    });

    socket.addEventListener("message", (event) => {
      console.log(`Message Received: '${event.data}'`);
      clearInterval(ping);
    });

    socket.addEventListener("error", (event) => {
      console.log(`Error: ${event.message}`);
      clearInterval(ping);
    });

    return socket;
  }

  public send(content: string, type: string = "message") {
    this.socket.send(JSON.stringify({ content, type }));
  }
}
