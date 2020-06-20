import { IVkBot, IContext, IMessage, IClientInfo, IContextObject, ISession } from "./models/vkbot.model";
export default class Context implements IContext {
    message: IMessage;
    client_info?: IClientInfo;
    bot: IVkBot;
    session?: ISession;
    constructor({ type, object: update, }: {
        type: string;
        object: IContextObject | IMessage;
    }, bot: IVkBot);
    reply(...args: any[]): void;
}
//# sourceMappingURL=context.d.ts.map