"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const context_1 = tslib_1.__importDefault(require("../context"));
const PollingError_1 = tslib_1.__importDefault(require("../errors/PollingError"));
function default_1(callback, ts) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
