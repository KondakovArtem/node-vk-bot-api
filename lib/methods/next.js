"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(ctx, idx = -1) {
    if (this.middlewares.length > idx + 1) {
        const { fn, triggers } = this.middlewares[idx + 1];
        const { message } = ctx;
        const isTriggered = (triggers || []).some((trigger) => {
            if (message.type === "message_new" && trigger !== "message_new") {
                const { text, body, payload } = message;
                let command;
                let exact = false;
                if (payload && payload !== "") {
                    const payloadData = JSON.parse(payload);
                    if (payloadData.command) {
                        command = `payload:${payloadData.command}`;
                        exact = true;
                    }
                    else if (payloadData.button) {
                        command = `payload:button:${payloadData.button}`;
                        exact = true;
                    }
                }
                if (!command) {
                    command = (message.text || message.body || "").toLowerCase();
                }
                if (trigger instanceof RegExp) {
                    const match = command.match(trigger);
                    if (match) {
                        ctx.match = match;
                    }
                    return !!match;
                }
                if (exact) {
                    return command === trigger;
                }
                return command.startsWith(trigger);
            }
            return message.type === trigger;
        });
        if (!triggers ||
            (!triggers.length && ctx.message.type === "message_new") ||
            isTriggered) {
            return fn(ctx);
        }
        return this.next(ctx, idx + 1);
    }
}
exports.default = default_1;
