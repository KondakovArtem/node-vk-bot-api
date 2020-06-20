import { IMiddleware, TTrigger } from "./models/vkbot.model";
import toArray from "./utils/toArray";

export class Scene {
  middlewares: {
    fn: IMiddleware;
  }[];

  constructor(public name: string, ...middlewares: IMiddleware[]) {
    this.middlewares = middlewares.map((fn) => ({ fn }));
  }

  command(_triggers: TTrigger | TTrigger[], ...middlewares: IMiddleware[]) {
    const triggers = toArray(_triggers).map((item) =>
      item instanceof RegExp ? item : item.toLowerCase()
    );

    this.middlewares.push(
      ...middlewares.map((fn) => ({
        fn,
        triggers,
      }))
    );
  }
}
