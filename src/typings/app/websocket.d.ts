export type TChatMessageDTO = {
  content: string;
  type: string;
  user_id: number;
  id: number;
  time: string;
};

export type TAppChatMessage = {
  content: string;
  userID: string;
};
