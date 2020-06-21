import api from "./api";
import utils from "./utils";
import {
  IVkBotSettings,
  IVkBot,
  IMiddleware,
  IMethod,
  ITs,
  TTrigger,
  TMiddlewareFn,
} from "./models/vkbot.model";

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

  public sendMessage = sendMessage;
  public startPolling = startPolling;
  public getLongPollParams = getLongPollParams;
  public use = use;
  public command = command;
  public next = next;
  public execute = execute;
  public webhookCallback = webhookCallback;
  public start = start;
  public stop = stop;
  public api = api;

  constructor(settings: IVkBotSettings) {
    if (!settings) {
      throw new Error("You must pass token into settings");
    } else if (typeof settings === "object" && !settings.token) {
      throw new Error("You must set token param in settings");
    }

    this.middlewares = [];
    this.methods = [];

    this.isStopped = false;

    this.settings = Object.assign(
      {
        polling_timeout: 25,
        execute_timeout: 50,
      },
      typeof settings === "object" ? settings : { token: settings }
    );

    setInterval(() => {
      utils.execute(this.methods, this.settings.token);
      this.methods = [];
    }, settings.execute_timeout);
  }

  event(triggers: TTrigger[], ...middlewares: TMiddlewareFn[]) {
    this.command(triggers, ...middlewares);
  }

  on(...middlewares: TMiddlewareFn[]) {
    this.command([], ...middlewares);
  }
}
