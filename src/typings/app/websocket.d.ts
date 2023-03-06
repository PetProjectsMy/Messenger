declare global {
  export namespace WebSocketTypings {
    export type MessageDTO = {
      content: string;
      type: string;
      user_id: number;
      id: number;
      time: string;
    };
  }
}

export {};
