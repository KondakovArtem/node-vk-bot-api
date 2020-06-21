export interface IMessage {
  date: number;
  from_id: number;
  id: number;
  out: number;
  peer_id?: number;
  user_id: number;
  conversation_message_id: number;
  fwd_messages: any[];
  important: boolean;
  random_id: number;
  attachments: any[];
  text?: string;
  body?: string;
  payload: string;
  is_hidden: boolean;
  type: string;
}

export interface ISession {
  __scene: {
    current: string;
    step: number;
  } | null;
}

export interface ISessionSettings {

}


export interface IScene {
  name: string;
  middlewares: IMiddleware[];
}

export interface IContext {
  message: IMessage;
  bot: IVkBot;
  session?: ISession;
  scene?: {
    enter(name: string, step?: number): void,
    leave(): void,
    next(): void,
    selectStep(index: number): void;
  }
  match?: RegExpMatchArray | null;
  reply(message: string, messageObj?: any, markup?: IMarkup): void;
}

export interface IMarkupKeyboard  {
  buttons: IMarkupButton[][];
  one_time?: boolean;
  inline?: boolean;
}

export interface IMarkup {
  __keyboard?: IMarkupKeyboard;
}

export interface IMarkupOptions {
  columns: number;
}

export const KEYBOARD_COLUMNS_MAX = 4;

export type IKeyboard = IMarkupButton[][] | string[];

export enum MarkupButtonColors {
  DEFAULT = "default",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  NEGATIVE = "negative",
  POSITIVE = "positive",
};

export interface IMarkupText {
  type: "text";
  label: string;
  payload: string
}

export interface IMarkupOpenLink {
  type: "open_link";
  link: string;
  label: string;
  payload: string;
}

export interface IMarkupLocation {
  type: "location";
  payload: string;
}

export interface IMarkupVkPay {
  type: "vkpay";
  payload: "string";
  hash: string;
}

export interface IMarkupOpenApp {
  type: "open_app";
  app_id: number;
  owner_id: number;
  payload: string;
  label: string;
  hash: string;
}

export interface IMarkupButton {
  action: IMarkupText | IMarkupOpenLink | IMarkupLocation | IMarkupVkPay | IMarkupOpenApp;
  color?: MarkupButtonColors;
}

export interface IContextObject {
  message: IMessage;
  client_info: IClientInfo;
}

export interface IClientInfo {}

export interface ILongPollParams {
  id: number;
  server: string;
}

export interface IVkBotSettings {
  polling_timeout?: number;
  execute_timeout?: number;
  group_id?: number;
  token: string;
  secret?: string;
  confirmation?: string;
}

export type TTrigger = RegExp | string;
export type TMiddlewareFn = (ctx: IContext, fn: () => void) => void;
export type ITs = string;

export interface IMiddleware {
  fn: (ctx: IContext) => void;
  triggers?: TTrigger[];
}

export interface IMethod {
  code: string;
  callback: () => void;
  resolve?: (value?: unknown) => void;
  reject?: (reason?: any) => void;
}


export interface IError {
  method: string;
}

export interface IVkBot {
  settings: IVkBotSettings;
  longPollParams?: ILongPollParams | null;
  isStopped: boolean;
  middlewares: IMiddleware[];
  methods: IMethod[];
  ts?: ITs;
  command(command: string | string[], ...middlewares: TMiddlewareFn[]): void;
  on(callback: (ctx: IContext) => void): void;
  startPolling(data?: {} | null, ts?: {}): void;
  use(middleware: Function): void;
  sendMessage(userId: number[] | number, ...args: any[]): void;
  getLongPollParams(): Promise<ILongPollParams>;
  execute(this: IVkBot,  method: string, settings: {}, callback?: () => void): Promise<any>;
  next(ctx: IContext, idx?: number): void;
  api<
    T = {
      response: [
        {
          id: number;
        }
      ];
    }
  >(
    apiName: string,
    settings: {
      access_token: string;
      group_id?: number;
    }
  ): Promise<T>;
}

export interface IPayloadData {
  command?: string;
  button?: string;
}