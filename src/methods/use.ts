import { IVkBot, IContext } from "../models/vkbot.model";

export default function (
  this: IVkBot,
  middleware: (ctx: IContext, fn: () => void) => void
) {
  const idx = this.middlewares.length;

  this.middlewares.push({
    fn: (ctx) => middleware(ctx, () => this.next(ctx, idx)),
  });

  return this;
}
