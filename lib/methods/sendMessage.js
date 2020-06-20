"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toArray_1 = __importDefault(require("../utils/toArray"));
function default_1(userId, ...args) {
    const [message, attachment, keyboard, sticker, randomId] = args;
    if (Array.isArray(userId) && userId.length > 100) {
        throw new Error("Message can't be sent to more than 100 recipients.");
    }
    return this.execute("messages.send", Object.assign(Array.isArray(userId)
        ? { user_ids: userId.join(",") }
        : { peer_id: userId }, typeof args[0] === "object"
        ? args[0]
        : {
            message,
            attachment: toArray_1.default(attachment).join(","),
            sticker_id: sticker,
            keyboard: keyboard ? keyboard.toJSON() : undefined,
            random_id: randomId || Date.now(),
        }));
}
exports.default = default_1;
