"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vkbot_model_1 = require("./models/vkbot.model");
class Markup {
    keyboard(keyboard, options = { columns: vkbot_model_1.KEYBOARD_COLUMNS_MAX }) {
        this.__keyboard = {
            buttons: Array.isArray(keyboard[0])
                ? keyboard
                : keyboard.reduce((array, label) => {
                    const button = Markup.button(label);
                    const buttons = array.length ? array[array.length - 1] : array[0];
                    if (buttons && buttons.length < options.columns) {
                        buttons.push(button);
                    }
                    else {
                        array.push([button]);
                    }
                    return array;
                }, []),
        };
        return this;
    }
    oneTime(value = true) {
        this.__keyboard.one_time = value;
        return this;
    }
    inline(value = true) {
        this.__keyboard.inline = value;
        return this;
    }
    toJSON() {
        return JSON.stringify(this.__keyboard);
    }
    static keyboard(keyboard, options) {
        return new Markup().keyboard(keyboard, options);
    }
    static button(label, color = vkbot_model_1.MarkupButtonColors.DEFAULT, sysname, payload = { button: sysname || label }) {
        if (typeof label === "object") {
            return label;
        }
        return {
            action: {
                type: "text",
                payload: JSON.stringify(payload),
                label,
            },
            color,
        };
    }
}
exports.default = Markup;
