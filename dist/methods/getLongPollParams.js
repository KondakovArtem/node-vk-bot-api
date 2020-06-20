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
const PollingError_1 = __importDefault(require("../errors/PollingError"));
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
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
