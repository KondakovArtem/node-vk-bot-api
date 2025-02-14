"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const api_1 = tslib_1.__importDefault(require("./api"));
const utils_1 = tslib_1.__importDefault(require("./utils"));
const command_1 = tslib_1.__importDefault(require("./methods/command"));
const sendMessage_1 = tslib_1.__importDefault(require("./methods/sendMessage"));
const startPolling_1 = tslib_1.__importDefault(require("./methods/startPolling"));
const getLongPollParams_1 = tslib_1.__importDefault(require("./methods/getLongPollParams"));
const use_1 = tslib_1.__importDefault(require("./methods/use"));
const next_1 = tslib_1.__importDefault(require("./methods/next"));
const webhookCallback_1 = tslib_1.__importDefault(require("./methods/webhookCallback"));
const start_1 = tslib_1.__importDefault(require("./methods/start"));
const execute_1 = tslib_1.__importDefault(require("./methods/execute"));
const stop_1 = tslib_1.__importDefault(require("./methods/stop"));
var markup_1 = require("./markup");
Object.defineProperty(exports, "Markup", { enumerable: true, get: function () { return markup_1.default; } });
var session_1 = require("./session");
Object.defineProperty(exports, "Session", { enumerable: true, get: function () { return session_1.default; } });
var api_2 = require("./api");
Object.defineProperty(exports, "apiCall", { enumerable: true, get: function () { return api_2.default; } });
tslib_1.__exportStar(require("./models/vkbot.model"), exports);
class VkBot {
    constructor(settings) {
        this.sendMessage = sendMessage_1.default;
        this.startPolling = startPolling_1.default;
        this.getLongPollParams = getLongPollParams_1.default;
        this.use = use_1.default;
        this.command = command_1.default;
        this.next = next_1.default;
        this.execute = execute_1.default;
        this.webhookCallback = webhookCallback_1.default;
        this.start = start_1.default;
        this.stop = stop_1.default;
        this.api = api_1.default;
        if (!settings) {
            throw new Error("You must pass token into settings");
        }
        else if (typeof settings === "object" && !settings.token) {
            throw new Error("You must set token param in settings");
        }
        this.middlewares = [];
        this.methods = [];
        this.isStopped = false;
        this.settings = Object.assign({
            polling_timeout: 25,
            execute_timeout: 50,
        }, typeof settings === "object" ? settings : { token: settings });
        setInterval(() => {
            utils_1.default.execute(this.methods, this.settings.token);
            this.methods = [];
        }, settings.execute_timeout);
    }
    event(triggers, ...middlewares) {
        this.command(triggers, ...middlewares);
    }
    on(...middlewares) {
        this.command([], ...middlewares);
    }
}
exports.default = VkBot;
