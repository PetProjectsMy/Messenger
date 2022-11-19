declare global {
  export type TWebsocketMessageDTO = {
    content: string;
    type: string;
    user_id: number;
    id: number;
    time: string;
  };
}

export {};
