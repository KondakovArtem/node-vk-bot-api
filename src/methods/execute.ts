import { IVkBot, IMethod } from "../models/vkbot.model";

export default function (this: IVkBot,  method: string, settings: {}, callback: () => void) {
  const request: IMethod = {
    code: `API.${method}(${JSON.stringify({
      v: '5.103',
      ...settings,
    })})`,
    callback,
  };

  const promise = new Promise((resolve, reject) => {
    request.resolve = resolve;
    request.reject = reject;
  });

  this.methods.push(request);

  return promise;
};
