import { transformMessageDTOtoAppMessage } from "utils/api";
import { ChatWebSocket } from "../socket-class";
import {
  EnumMessageType,
  EnumSocketEvents,
  type TConstructorArgs,
} from "../typings";

export class ChatMessagesHandler extends ChatWebSocket {
  static readonly messagesGetLimit = 20;

  private currentBatch = -1;

  private allMessagesReceivedStatus = false;

  private allMessages = [] as TAppChatMessage[];

  constructor(argsObject: TConstructorArgs) {
    super(argsObject);

    this._addMessagesListener();
  }

  public async getAllMessages() {
    await this._getAllMessagesFromBatch(0);
    if (this.allMessagesReceivedStatus) {
      console.log(`CHAT(${this.chatID}) ALL MESSAGES RECEIVED SUCCESSFULLY`);
    }

    const { allMessages } = this;
    this._resetAllMessageReceivingStatus();
    return allMessages;
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

  private _addMessagesListener() {
    this.socket.addEventListener(
      EnumSocketEvents.Message,

      function (this: ChatMessagesHandler, event: MessageEvent) {
        let message;

        try {
          message = JSON.parse(event.data);
        } catch (err) {
          console.log(
            `ERROR ON PARSING MESSAGE ${JSON.stringify(message)} ON CHAT(${
              this.chatID
            }) SOCKET`
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

        message = transformMessageDTOtoAppMessage(message);
        const messagesStatePath = `chatsMessages.${this.chatID}`;

        const currentMessages = window.store.chatHasMessages(this.chatID)
          ? window.store.getStateByPath(messagesStatePath)
          : [];

        window.store.setStateByPath(
          messagesStatePath,
          [message, ...currentMessages],
          true
        );
      }.bind(this)
    );
  }

  private _handleMessagesArray(messagesBatch: WebSocketTypings.MessageDTO[]) {
    this._setMessagesBatch(messagesBatch);
  }

  private _setMessagesBatch(messagesBatch: WebSocketTypings.MessageDTO[]) {
    if (messagesBatch.length === 0) {
      this.allMessagesReceivedStatus = true;
      return;
    }

    this.currentBatch += 1;
    const receivedMessages = messagesBatch.map((msg) =>
      transformMessageDTOtoAppMessage(msg)
    );
    this.allMessages = [...this.allMessages, ...receivedMessages];
  }

  private async _getAllMessagesFromBatch(currentBatch: number) {
    const offset = currentBatch * ChatMessagesHandler.messagesGetLimit;
    this.getMessagesByOffset(offset);

    let messagesBatchAwaiter: NodeJS.Timer;
    await new Promise<void>((resolve, reject) => {
      messagesBatchAwaiter = setInterval(() => {
        if (this.socket.readyState > 1) {
          reject(
            new Error("Socket Closed While Awaiting Old Messages Get Responses")
          );
          return;
        }

        if (
          this.allMessagesReceivedStatus ||
          this.currentBatch === currentBatch
        ) {
          resolve();
          console.log(
            `SUCCESSFULLY GOT CHAT(${this.chatID}) MESSAGES BATCH WITH OFFSET ${offset}`
          );
        }
      }, 50);
    })
      .catch((error: TypeError) => {
        console.error(
          `ERROR OCCURRED ON BATCH ${currentBatch} WHILE RECEIVING ALL MESSAGES: ${error}`
        );
        this._resetAllMessageReceivingStatus();
      })
      .finally(() => {
        clearInterval(messagesBatchAwaiter);
      });

    if (!this.allMessagesReceivedStatus) {
      await this._getAllMessagesFromBatch(currentBatch + 1);
    }
  }

  private _resetAllMessageReceivingStatus() {
    this.allMessages = [];
    this.allMessagesReceivedStatus = false;
    this.currentBatch = -1;
  }
}
