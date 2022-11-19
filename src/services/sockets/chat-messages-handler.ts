import { transformWebsocketMessageDTOtoAppMessage } from "utils/api";
import { ChatWebSocket, TChatWebSocketContructorArgs } from "./socket-class";

export class ChatMessagesHandler extends ChatWebSocket {
  private currentBatch: number = -1;

  private allMessagesReceivedStatus: boolean = false;

  private allMessages = [] as TAppChatMessage[];

  constructor(argsObject: TChatWebSocketContructorArgs) {
    super(argsObject);

    this.allMessagesReceiver = function (
      messagesBatch: TWebsocketMessageDTO[]
    ) {
      this.messagesBatch(messagesBatch);
    }.bind(this);
  }

  private _getMessagesBatch(messagesBatch: TWebsocketMessageDTO[]) {
    if (messagesBatch.length === 0) {
      this.allMessagesReceivedStatus = true;
      this.currentBatch = -1;
      this.allMessages = [];
      return;
    }

    this.currentBatch += 1;
    const receivedMessages = messagesBatch.map((msg) =>
      transformWebsocketMessageDTOtoAppMessage(msg)
    );
    this.allMessages = [...this.allMessages, ...receivedMessages];
  }

  public getAllMessages() {}
}
