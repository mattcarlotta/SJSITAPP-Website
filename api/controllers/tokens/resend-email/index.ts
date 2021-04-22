import type { Request, Response } from "express";
import { Mail, Token } from "~models";
import {
  createAuthMail,
  createSignupToken,
  expirationDate,
  sendError
} from "~helpers";
import { unableToLocateToken, unableToUpdateToken } from "~messages/errors";

/**
 * Resend token emails.
 *
 * @function resendToken
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const resendToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: _id } = req.params;

    const existingToken = await Token.findOne({ _id }, { __v: 0, token: 0 });
    if (!existingToken) throw unableToLocateToken;
    if (existingToken.email) throw unableToUpdateToken;

    const { authorizedEmail, role } = existingToken;

    const token = createSignupToken();
    const expiration = expirationDate();

    await existingToken.updateOne({
      expiration: expiration.toDate(),
      token
    });

    await Mail.create(createAuthMail(authorizedEmail, token, expiration, role));

    return res.status(201).json({
      message: `An authorization token will be resent to ${authorizedEmail} shortly.`
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default resendToken;
