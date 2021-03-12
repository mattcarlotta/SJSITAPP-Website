import get from "lodash.get";
import { NextApiRequest, AxiosResponse } from "~types";

/**
 * Helper function to parse a cookie from an API request.
 *
 * @function parseCookie
 * @param {obj} req - an API request.
 * @returns {obj} - a object with a cookie from req.headers.cookie.
 */
export function parseCookie(
  req: NextApiRequest
): { headers: { cookie: any } } | undefined {
  const cookie = get(req, ["headers", "cookie"]);
  return cookie ? { headers: { cookie } } : undefined;
}

/**
 * Helper function to parse a message from an API response.
 *
 * @param res - an API response.
 * @returns a parsed message string from res.data.message.
 */
export function parseMessage(res: AxiosResponse): string {
  return get(res, ["data", "message"]);
}

/**
 * Helper function to parse data from an API response.
 *
 * @param res - an API response.
 * @returns a parsed data object from res.data.
 */
export function parseData<T>(res: AxiosResponse): T {
  return get(res, ["data"]);
}
