import {
  IVkBot,
  TTrigger,
  TMiddlewareFn,
} from "../models/vkbot.model";
import toArray from "../utils/toArray";
// import { VkBot } from "./index";

export default function (
  this: IVkBot,
  _triggers: TTrigger[] | TTrigger,
  ...middlewares: TMiddlewareFn[]
) {
  const triggers = toArray(_triggers).map((item) =>
    item instanceof RegExp ? item : item.toLowerCase()
  );

  middlewares.forEach((fn) => {
    const idx = this.middlewares.length;

    this.middlewares.push({
      fn: (ctx) => fn(ctx, () => this.next(ctx, idx)),
      triggers,
    });
  });

  return this;
}
