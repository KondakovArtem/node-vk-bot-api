"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toArray_1 = __importDefault(require("../utils/toArray"));
// import { VkBot } from "./index";
function default_1(_triggers, ...middlewares) {
    const triggers = toArray_1.default(_triggers).map((item) => item instanceof RegExp ? item : item.toLowerCase());
    middlewares.forEach((fn) => {
        const idx = this.middlewares.length;
        this.middlewares.push({
            fn: (ctx) => fn(ctx, () => this.next(ctx, idx)),
            triggers,
        });
    });
    return this;
}
exports.default = default_1;
