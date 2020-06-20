import axios from "axios";
import { stringify } from "querystring";
import ApiError from "./errors/ApiError";

export default async function (method: string, settings = {}) {
  const { data } = await axios.post(
    `https://api.vk.com/method/${method}`,
    stringify({
      v: 5.103,
      ...settings,
    })
  );

  if (data.error) {
    throw new ApiError(data.error);
  }

  return data;
}
