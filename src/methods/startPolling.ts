import axios from "axios";
import Context from "../context";
import PollingError from "../errors/PollingError";
import { IVkBot, IContextObject, IMessage } from "../models/vkbot.model";

export default async function (this: IVkBot, callback?: () => void, ts?: any) {
  try {
    if (this.isStopped) {
      return;
    }

    if (!this.longPollParams) {
      this.longPollParams = await this.getLongPollParams();
    }

    if (typeof callback === "function") {
      callback();
    }

    const { data: body } = await axios.get(this.longPollParams!.server, {
      params: {
        ...this.longPollParams,
        ts,
        act: "a_check",
        wait: this.settings.polling_timeout,
      },
    });

    if (body.failed === 1) {
      return this.startPolling(null, body.ts);
    }

    if (body.failed) {
      this.longPollParams = null;
      this.startPolling();

      return;
    }

    this.ts = body.ts;

    this.startPolling(null, body.ts);

    body.updates.forEach(
      (update: { type: string; object: IContextObject | IMessage }) =>
        this.next(new Context(update, this))
    );
  } catch (err) {
    if (err instanceof PollingError) {
      this.longPollParams = null;
      this.startPolling();
      return;
    }
    throw err;
  }
}
