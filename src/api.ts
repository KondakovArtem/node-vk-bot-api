import axios from "axios";
import { stringify } from "querystring";
import ApiError from "./errors/ApiError";

async function apiCall<T = any>(method: string, settings = {}): Promise<T> {
  const params = stringify({
    v: 5.103,
    ...settings,
  });
  const { data } = await axios.post(
    `https://api.vk.com/method/${method}`,
    params
  );

  if (data.error) {
    throw new ApiError(data.error);
  }

  return data;
}

export default apiCall;
