import {
  ISession,
  ISessionSettings,
  IContext,
  IScene,
} from "./models/vkbot.model";

export default class Session implements ISession {
  __scene: {
    current: string;
    step: number;
  } | null = null;
  store: Map<string, any> = new Map();
  key = "session";

  constructor(settings: ISessionSettings) {
    Object.assign(this, settings);
  }

  getSessionKey(ctx: IContext) {
    const userId = ctx.message.from_id || ctx.message.user_id;
    return `${userId}:${userId}`;
  }

  middleware() {
    return (ctx: IContext, next: () => void) => {
      const key = this.getSessionKey(ctx);
      let session = this.store.get(key) || {};

      Object.defineProperty(ctx, this.key, {
        get: () => session,
        set: (value) => {
          session = value;
        },
      });

      this.store.set(key, session);

      next();
    };
  }
}
