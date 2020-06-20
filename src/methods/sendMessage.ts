import toArray from "../utils/toArray";
import { IVkBot } from "../models/vkbot.model";

export default function (this: IVkBot, userId: number[] | number, ...args: any[]) {
  const [message, attachment, keyboard, sticker, randomId] = args;

  if (Array.isArray(userId) && userId.length > 100) {
    throw new Error("Message can't be sent to more than 100 recipients.");
  }

  return this.execute(
    "messages.send",
    Object.assign(
      Array.isArray(userId)
        ? { user_ids: userId.join(",") }
        : { peer_id: userId },
      typeof args[0] === "object"
        ? args[0]
        : {
            message,
            attachment: toArray(attachment).join(","),
            sticker_id: sticker,
            keyboard: keyboard ? keyboard.toJSON() : undefined,
            random_id: randomId || Date.now(),
          }
    )
  );
}
