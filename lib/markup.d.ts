import { IMarkup, IMarkupKeyboard, IMarkupOptions, IKeyboard, IMarkupButton, MarkupButtonColors } from "./models/vkbot.model";
export interface IButton {
}
interface IButtonPayload {
    button: string;
    [index: string]: any;
}
export default class Markup implements IMarkup {
    __keyboard?: IMarkupKeyboard;
    keyboard(keyboard: IKeyboard, options?: IMarkupOptions): this;
    oneTime(value?: boolean): this;
    inline(value?: boolean): this;
    toJSON(): string;
    static keyboard(keyboard: IKeyboard, options?: IMarkupOptions): Markup;
    static button(label: string | IMarkupButton, color?: MarkupButtonColors, sysname?: string, payload?: IButtonPayload): IMarkupButton;
}
export {};
//# sourceMappingURL=markup.d.ts.map