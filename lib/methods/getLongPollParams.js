"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const PollingError_1 = tslib_1.__importDefault(require("../errors/PollingError"));
function default_1() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!this.settings.group_id) {
            const { response } = yield this.api("groups.getById", {
                access_token: this.settings.token,
            });
            this.settings.group_id = response[0].id;
        }
        try {
            const { response } = yield this.api("groups.getLongPollServer", {
                group_id: this.settings.group_id,
                access_token: this.settings.token,
            });
            return response;
        }
        catch (err) {
            throw new PollingError_1.default(err);
        }
    });
}
exports.default = default_1;
