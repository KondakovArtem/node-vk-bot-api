"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const tslib_1 = require("tslib");
const toArray_1 = tslib_1.__importDefault(require("./utils/toArray"));
class Scene {
    constructor(name, ...middlewares) {
        this.name = name;
        this.middlewares = middlewares.map((fn) => ({ fn }));
    }
    command(_triggers, ...middlewares) {
        const triggers = toArray_1.default(_triggers).map((item) => item instanceof RegExp ? item : item.toLowerCase());
        this.middlewares.push(...middlewares.map((fn) => ({
            fn,
            triggers,
        })));
    }
}
exports.Scene = Scene;
