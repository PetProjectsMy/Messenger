import { transformWebsocketMessageDTOtoAppMessage } from "utils/api";
import { ChatWebSocket } from "./socket-class";

export class ChatMessagesHandler extends ChatWebSocket {
  static readonly messagesGetLimit = 20;

  protected _handleMessagesArray(messagesBatch: WebSocketTypings.MessageDTO[]) {
    this._setMessagesBatch(messagesBatch);
  }
  private currentBatch = -1;

  private allMessagesReceivedStatus = false;

  private allMessages = [] as TAppChatMessage[];

  private _setMessagesBatch(messagesBatch: WebSocketTypings.MessageDTO[]) {
    if (messagesBatch.length === 0) {
      this.allMessagesReceivedStatus = true;
      return;
    }

    this.currentBatch += 1;
    const receivedMessages = messagesBatch.map((msg) =>
      transformWebsocketMessageDTOtoAppMessage(msg)
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

  public async getAllMessages() {
    await this._getAllMessagesFromBatch(0);
    if (this.allMessagesReceivedStatus) {
      console.log(`CHAT(${this.chatID}) ALL MESSAGES RECEIVED SUCCESSFULLY`);
    }

    const { allMessages } = this;
    this._resetAllMessageReceivingStatus();
    return allMessages;
  }

  private _resetAllMessageReceivingStatus() {
    this.allMessages = [];
    this.allMessagesReceivedStatus = false;
    this.currentBatch = -1;
  }
}
