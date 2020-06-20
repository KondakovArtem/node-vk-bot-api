"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const api_1 = tslib_1.__importDefault(require("../api"));
const ApiError_1 = tslib_1.__importDefault(require("../errors/ApiError"));
exports.default = (methods, token) => {
    const promises = [];
    const calls = [];
    methods.forEach((item, index) => {
        promises.push({
            resolve: item.resolve,
            reject: item.reject,
        });
        calls.push(`"${index + 1}": ${item.code}`);
    });
    for (let i = 0, j = Math.ceil(calls.length / 25); i < j; i++) {
        const code = calls.slice(i * 25, i * 25 + 25).join(",");
        api_1.default("execute", {
            code: `return { ${code} };`,
            access_token: token,
        })
            .then(({ response, execute_errors: errors = [], }) => {
            const apiErrors = errors.filter((item) => item.method !== "execute");
            Object.entries(response).forEach(([index, response]) => {
                const { resolve, reject } = promises[parseInt(index, 10) - 1];
                if (!response) {
                    reject(new ApiError_1.default(apiErrors.shift()));
                }
                else {
                    resolve(response);
                }
            });
        })
            .catch(console.error);
    }
};
