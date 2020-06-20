"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const toArray_1 = tslib_1.__importDefault(require("../utils/toArray"));
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
