import api from "../api";
import ApiError from "../errors/ApiError";
import { IMethod, IError } from "../models/vkbot.model";



export default (methods: IMethod[], token: string) => {
  const promises: {
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
  }[] = [];
  const calls: string[] = [];

  methods.forEach((item, index: number) => {
    promises.push({
      resolve: item.resolve!,
      reject: item.reject!,
    });

    calls.push(`"${index + 1}": ${item.code}`);
  });

  for (let i = 0, j = Math.ceil(calls.length / 25); i < j; i++) {
    const code = calls.slice(i * 25, i * 25 + 25).join(",");

    api("execute", {
      code: `return { ${code} };`,
      access_token: token,
    })
      .then(
        ({
          response,
          execute_errors: errors = [],
        }: {
          response?: any;
          execute_errors?: IError[];
        }) => {
          const apiErrors = errors.filter((item) => item.method !== "execute");

          Object.entries(response).forEach(([index, response]) => {
            const { resolve, reject } = promises[parseInt(index, 10) - 1];

            if (!response) {
              reject(new ApiError(apiErrors.shift()!));
            } else {
              resolve(response);
            }
          });
        }
      )
      .catch(console.error);
  }
};
