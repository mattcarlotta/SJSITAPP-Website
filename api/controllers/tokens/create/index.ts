import type { Request, Response } from "express";
import { Mail, Token } from "~models";
import {
  createAuthMail,
  createSignupToken,
  expirationDate,
  sendError
} from "~helpers";
import {
  emailAssociatedWithKey,
  invalidAuthTokenRequest
} from "~messages/errors";

/**
 * Creates a new token (authorization token).
 *
 * @function createToken
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const createToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { authorizedEmail, role } = req.body;
    if (!authorizedEmail || !role) throw invalidAuthTokenRequest;

    const emailExists = await Token.findOne({ authorizedEmail });
    if (emailExists) throw emailAssociatedWithKey;

    const token = createSignupToken();
    const expiration = expirationDate();

    await Token.create({
      authorizedEmail,
      expiration: expiration.toDate(),
      token,
      role
    });

    await Mail.create(createAuthMail(authorizedEmail, token, expiration, role));

    return res.status(201).json({
      message: `Successfully created and sent an authorization token to ${authorizedEmail}.`
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default createToken;
