"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(method, settings, callback) {
    const request = {
        code: `API.${method}(${JSON.stringify(Object.assign({ v: '5.103' }, settings))})`,
        callback,
    };
    const promise = new Promise((resolve, reject) => {
        request.resolve = resolve;
        request.reject = reject;
    });
    this.methods.push(request);
    return promise;
}
exports.default = default_1;
;
