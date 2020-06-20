import { ISession, ISessionSettings, IContext } from "./models/vkbot.model";
export declare class Session implements ISession {
    __scene: {
        current: string;
        step: number;
    } | null;
    store: Map<string, any>;
    key: string;
    constructor(settings: ISessionSettings);
    getSessionKey(ctx: IContext): string;
    middleware(): (ctx: IContext, next: () => void) => void;
}
//# sourceMappingURL=session.d.ts.map