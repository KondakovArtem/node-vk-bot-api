"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Session {
    constructor(settings) {
        this.__scene = null;
        this.store = new Map();
        this.key = "session";
        Object.assign(this, settings);
    }
    getSessionKey(ctx) {
        const userId = ctx.message.from_id || ctx.message.user_id;
        return `${userId}:${userId}`;
    }
    middleware() {
        return (ctx, next) => {
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
exports.default = Session;
