"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("../request"));
const context_1 = __importDefault(require("../context"));
const CONFIRMATION_TYPE = "confirmation";
function default_1(...args) {
    var _a;
    if (this.isStopped) {
        return;
    }
    const request = new request_1.default(...args);
    if (request.body.type !== CONFIRMATION_TYPE &&
        this.settings.secret &&
        this.settings.secret !== request.body.secret) {
        request.body = "error";
        return;
    }
    if (request.body.type !== CONFIRMATION_TYPE) {
        request.body = "ok";
        return this.next(new context_1.default(request.body, this));
    }
    request.body = (_a = this.settings.confirmation) === null || _a === void 0 ? void 0 : _a.toString();
}
exports.default = default_1;
