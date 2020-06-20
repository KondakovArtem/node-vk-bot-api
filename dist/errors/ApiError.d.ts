import { IError } from "../models/vkbot.model";
export default class ApiError extends Error {
    response: IError;
    constructor(response: IError);
}
//# sourceMappingURL=ApiError.d.ts.map