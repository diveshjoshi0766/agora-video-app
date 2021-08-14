export interface ITextMessageBlock {
  data: {
    text: string;
    blob: string;
  };
  messageType: string;
}

export interface ITextMessage {
  messages: Array<ITextMessageBlock>;
  author: string;
  time: number;
}

export interface IMessage {
  type: string;
  data: {
    [key: string]: string;
  };
}
