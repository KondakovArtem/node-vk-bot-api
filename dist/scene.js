"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const toArray_1 = __importDefault(require("./utils/toArray"));
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
