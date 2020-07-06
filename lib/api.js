"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const querystring_1 = require("querystring");
const ApiError_1 = tslib_1.__importDefault(require("./errors/ApiError"));
function apiCall(method, settings = {}) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const params = querystring_1.stringify(Object.assign({ v: 5.103 }, settings));
        const { data } = yield axios_1.default.post(`https://api.vk.com/method/${method}`, params);
        if (data.error) {
            throw new ApiError_1.default(data.error);
        }
        return data;
    });
}
exports.default = apiCall;
