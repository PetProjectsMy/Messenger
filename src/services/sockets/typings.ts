export type TConstructorArgs = {
  userID: string;
  chatID: string;
  chatToken: string;
};

export const enum EnumSocketEvents {
  Close = "close",
  Message = "message",
}

export const enum EnumMessageType {
  GetOld = "get old",
  Message = "message",
  Ping = "ping",
  Pong = "pong",
  UserConnected = "user connected",
}
