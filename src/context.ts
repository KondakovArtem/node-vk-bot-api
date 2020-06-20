import {
  IVkBot,
  IContext,
  IMessage,
  IClientInfo,
  IContextObject,
  ISession,
} from "./models/vkbot.model";

export default class Context implements IContext {
  public message: IMessage;
  public client_info?: IClientInfo;
  public bot: IVkBot;
  public session?: ISession;

  constructor(
    {
      type,
      object: update,
    }: {
      type: string;
      object: IContextObject | IMessage;
    },
    bot: IVkBot
  ) {
    if ((update as IContextObject).message) {
      this.message = { ...(update as IContextObject).message, type };
      this.client_info = (update as IContextObject).client_info;
    } else {
      this.message = { ...(update as IMessage), type };
    }

    this.bot = bot;
  }

  reply(...args: any[]) {
    return this.bot.sendMessage(
      this.message.peer_id! || this.message.user_id!,
      ...args
    );
  }
}
