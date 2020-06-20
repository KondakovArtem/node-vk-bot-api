import {
  IMarkup,
  IMarkupKeyboard,
  IMarkupOptions,
  IKeyboard,
  KEYBOARD_COLUMNS_MAX,
  IMarkupButton,
} from "./models/vkbot.model";

export interface IButton {}

export default class Markup implements IMarkup {
  __keyboard?: IMarkupKeyboard;

  keyboard(
    keyboard: IKeyboard,
    options: IMarkupOptions = { columns: KEYBOARD_COLUMNS_MAX }
  ) {
    this.__keyboard = {
      buttons: Array.isArray(keyboard[0])
        ? keyboard as IMarkupButton[][]
        : (keyboard as string[]).reduce((array, label) => {
            const button = Markup.button(label);
            const buttons = array.length ? array[array.length - 1] : array[0];

            if (buttons && buttons.length < options.columns) {
              buttons.push(button);
            } else {
              array.push([button]);
            }

            return array;
          }, [] as IMarkupButton[][]),
    };

    return this;
  }

  oneTime(value = true) {
    this.__keyboard!.one_time = value;

    return this;
  }

  inline(value = true) {
    this.__keyboard!.inline = value;

    return this;
  }

  toJSON() {
    return JSON.stringify(this.__keyboard);
  }

  static keyboard(keyboard: IKeyboard, options: IMarkupOptions) {
    return new Markup().keyboard(keyboard, options);
  }

  static button(label: string | IMarkupButton, color = "default", payload = { button: label }): IMarkupButton {
    if (typeof label === "object") {
      return label;
    }

    return {
      action: {
        type: "text",
        payload: JSON.stringify(payload),
        label,
      },
      color,
    };
  }
}
