"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Context {
    constructor({ type, object: update, }, bot) {
        if (update.message) {
            this.message = Object.assign(Object.assign({}, update.message), { type });
            this.client_info = update.client_info;
        }
        else {
            this.message = Object.assign(Object.assign({}, update), { type });
        }
        this.bot = bot;
    }
    reply(...args) {
        return this.bot.sendMessage(this.message.peer_id || this.message.user_id, ...args);
    }
}
exports.default = Context;
