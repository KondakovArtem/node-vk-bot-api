"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(response) {
        super();
        this.response = response;
        this.message = 'ApiError';
    }
}
exports.default = ApiError;
;
