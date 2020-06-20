"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const context_1 = __importDefault(require("../context"));
const PollingError_1 = __importDefault(require("../errors/PollingError"));
function default_1(callback, ts) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (this.isStopped) {
                return;
            }
            if (!this.longPollParams) {
                this.longPollParams = yield this.getLongPollParams();
            }
            if (typeof callback === "function") {
                callback();
            }
            const { data: body } = yield axios_1.default.get(this.longPollParams.server, {
                params: Object.assign(Object.assign({}, this.longPollParams), { ts, act: "a_check", wait: this.settings.polling_timeout }),
            });
            if (body.failed === 1) {
                return this.startPolling(null, body.ts);
            }
            if (body.failed) {
                this.longPollParams = null;
                this.startPolling();
                return;
            }
            this.ts = body.ts;
            this.startPolling(null, body.ts);
            body.updates.forEach((update) => this.next(new context_1.default(update, this)));
        }
        catch (err) {
            if (err instanceof PollingError_1.default) {
                this.longPollParams = null;
                this.startPolling();
                return;
            }
            throw err;
        }
    });
}
exports.default = default_1;
