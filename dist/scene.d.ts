import { IMiddleware, TTrigger } from "./models/vkbot.model";
export declare class Scene {
    name: string;
    middlewares: {
        fn: IMiddleware;
    }[];
    constructor(name: string, ...middlewares: IMiddleware[]);
    command(_triggers: TTrigger | TTrigger[], ...middlewares: IMiddleware[]): void;
}
//# sourceMappingURL=scene.d.ts.map