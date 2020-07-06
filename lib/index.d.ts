import api from "./api";
import { IVkBotSettings, IVkBot, IMiddleware, IMethod, ITs, TTrigger, TMiddlewareFn } from "./models/vkbot.model";
import command from "./methods/command";
import sendMessage from "./methods/sendMessage";
import startPolling from "./methods/startPolling";
import getLongPollParams from "./methods/getLongPollParams";
import use from "./methods/use";
import next from "./methods/next";
import webhookCallback from "./methods/webhookCallback";
import start from "./methods/start";
import execute from "./methods/execute";
import stop from "./methods/stop";
export { default as Markup } from "./markup";
export { default as Session } from "./session";
export { default as apiCall } from "./api";
export * from "./models/vkbot.model";
export default class VkBot implements IVkBot {
    middlewares: IMiddleware[];
    settings: IVkBotSettings;
    methods: IMethod[];
    ts?: ITs;
    isStopped: boolean;
    sendMessage: typeof sendMessage;
    startPolling: typeof startPolling;
    getLongPollParams: typeof getLongPollParams;
    use: typeof use;
    command: typeof command;
    next: typeof next;
    execute: typeof execute;
    webhookCallback: typeof webhookCallback;
    start: typeof start;
    stop: typeof stop;
    api: typeof api;
    constructor(settings: IVkBotSettings);
    event(triggers: TTrigger[], ...middlewares: TMiddlewareFn[]): void;
    on(...middlewares: TMiddlewareFn[]): void;
}
//# sourceMappingURL=index.d.ts.map