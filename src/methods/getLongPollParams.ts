import { IVkBot, ILongPollParams } from "../models/vkbot.model";
import PollingError from "../errors/PollingError";

export default async function (this: IVkBot) {
  if (!this.settings.group_id) {
    const { response } = await this.api<{ response: ILongPollParams[] }>(
      "groups.getById",
      {
        access_token: this.settings.token,
      }
    );

    this.settings.group_id = response[0].id;
  }

  try {
    const { response } = await this.api("groups.getLongPollServer", {
      group_id: this.settings.group_id,
      access_token: this.settings.token,
    });

    return response;
  } catch (err) {
    throw new PollingError(err);
  }
}
