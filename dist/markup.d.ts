import { IMarkup, IMarkupKeyboard, IMarkupOptions, IKeyboard, IMarkupButton } from "./models/vkbot.model";
export interface IButton {
}
export default class Markup implements IMarkup {
    __keyboard?: IMarkupKeyboard;
    keyboard(keyboard: IKeyboard, options?: IMarkupOptions): this;
    oneTime(value?: boolean): this;
    inline(value?: boolean): this;
    toJSON(): string;
    static keyboard(keyboard: IKeyboard, options: IMarkupOptions): Markup;
    static button(label: string | IMarkupButton, color?: string, payload?: {
        button: string | IMarkupButton;
    }): IMarkupButton;
}
//# sourceMappingURL=markup.d.ts.map