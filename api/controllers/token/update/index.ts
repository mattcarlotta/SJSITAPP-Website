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
  missingUpdateTokenParams,
  unableToLocateToken,
  unableToUpdateToken
} from "~messages/errors";

/**
 * Updates an token's details.
 *
 * @function updateToken
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const updateToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { _id, authorizedEmail, role } = req.body;
    if (!_id || !authorizedEmail || !role) throw missingUpdateTokenParams;

    const existingToken = await Token.findOne({ _id });
    if (!existingToken) throw unableToLocateToken;
    if (existingToken.email) throw unableToUpdateToken;

    let emailInUse;
    if (existingToken.authorizedEmail !== authorizedEmail) {
      emailInUse = await Token.findOne(
        {
          authorizedEmail
        },
        { token: 1 }
      ).lean();
    } else {
      emailInUse = await Token.findOne(
        { email: authorizedEmail },
        { token: 1 }
      ).lean();
    }
    if (emailInUse) throw emailAssociatedWithKey;

    const token = createSignupToken();
    const expiration = expirationDate();

    await existingToken.updateOne({
      authorizedEmail,
      expiration: expiration.toDate(),
      role,
      token
    });

    await Mail.create(createAuthMail(authorizedEmail, token, expiration, role));

    return res.status(201).json({
      message: `Successfully updated and sent a new authorization key to ${authorizedEmail}.`
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default updateToken;
