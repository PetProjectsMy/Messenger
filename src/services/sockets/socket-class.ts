export class ChatWebSocket {
  private userID: string;

  private chatID: string;

  private chatToken: string;

  private socket: WebSocket;

  private ping: NodeJS.Timer;

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
    this._createSocket();
  }

  private _createSocket() {
    const { userID, chatID, chatToken } = this;

    const socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userID}/${chatID}/${chatToken}`
    );
    this.socket = socket;

    socket.addEventListener(
      "close",
      function (event) {
        if (!event.wasClean) {
          console.log(`Chat(${chatID}) Socket Closed Clearly`);
        } else {
          console.log(
            `Chat(${chatID}) Socket Closed With Error: code ${event.code}, reason ${event.reason}`
          );
          clearInterval(this.ping);
        }
      }.bind(this)
    );

    socket.addEventListener("message", function (event) {
      console.log(`Message Received: '${event.data}'`);
    });

    socket.addEventListener(
      "error",
      function (event) {
        console.log(`Error: ${event.message}`);
        clearInterval(this.ping);
      }.bind(this)
    );

    this.ping = setInterval(function () {
      socket.send(
        JSON.stringify({
          type: "ping",
        })
      );
      console.log("PING");
    }, 20000);
  }

  public send(content: string, type: string = "message") {
    this.socket.send(JSON.stringify({ content, type }));
  }
}
