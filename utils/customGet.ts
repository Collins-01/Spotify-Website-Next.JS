import { MySession } from "../types/types";

export const customGet = async (
  url: string,
  session: MySession | null,
  method?: HTTPMETHOD,
  body?: any
) => {
  console.info(`METHOD: ${method} --> URL: ${url} --> body: ${JSON.stringify(body)}`);
  const res = await fetch(url, {
    method: method ?? HTTPMETHOD.GET,
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
    body: body == null ? null : JSON.stringify(body),
  }).then((res) => res.json());

  return res;
};

export enum HTTPMETHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
}
