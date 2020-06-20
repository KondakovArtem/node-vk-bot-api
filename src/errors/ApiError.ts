import { IError } from "../models/vkbot.model";

export default class ApiError extends Error {
  constructor(public response: IError) {
    super();
    this.message = 'ApiError';
  }
};
