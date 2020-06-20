import { IVkBot } from "../models/vkbot.model";
import Request from '../request';
import Context from '../context';

const CONFIRMATION_TYPE = "confirmation";

export default function (this: IVkBot, ...args: [any]) {
  if (this.isStopped) {
    return;
  }

  const request = new Request(...args);

  if (
    request.body.type !== CONFIRMATION_TYPE &&
    this.settings.secret &&
    this.settings.secret !== request.body.secret
  ) {
    request.body = "error";

    return;
  }

  if (request.body.type !== CONFIRMATION_TYPE) {
    request.body = "ok";

    return this.next(new Context(request.body, this));
  }

  request.body = this.settings.confirmation?.toString();
}
