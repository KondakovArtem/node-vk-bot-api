"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(middleware) {
    const idx = this.middlewares.length;
    this.middlewares.push({
        fn: (ctx) => middleware(ctx, () => this.next(ctx, idx)),
    });
    return this;
}
exports.default = default_1;
