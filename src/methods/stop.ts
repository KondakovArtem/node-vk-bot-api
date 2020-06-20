import { IVkBot } from "../models/vkbot.model";

export default function (this: IVkBot) {
  this.isStopped = true;
  return this;
}
