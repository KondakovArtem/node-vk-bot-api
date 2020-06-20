import { IContext, IMiddleware, IScene } from "./models/vkbot.model";
export default class Stage {
    scenes: {
        [index: string]: IMiddleware[];
    };
    constructor(...scenes: IScene[]);
    enter(ctx: IContext): void;
    middleware(): (ctx: IContext, next: () => void) => void;
}
//# sourceMappingURL=stage.d.ts.map