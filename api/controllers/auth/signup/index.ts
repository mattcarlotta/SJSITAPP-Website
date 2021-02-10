import type { Request, Response } from "express";
import {
  expiredToken,
  invalidSignupEmail,
  invalidToken,
  missingSignupCreds,
  tokenAlreadyUsed,
  usernameAlreadyTaken
} from "~messages/errors";
import { thanksForReg } from "~messages/success";
import { createDate, createRandomToken, sendError } from "~helpers";
import { newUserTemplate } from "~services/templates";
import { Mail, Token, User } from "~models";

/**
 * Creates a new user.
 *
 * @function createUser
 * @returns {string} - message
 * @throws {ResponseError}
 */
const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, firstName, lastName, password, token } = req.body;
    if (!email || !firstName || !lastName || !password || !token)
      throw missingSignupCreds;

    const newToken = createRandomToken(); // a token used for email verification

    // see if the token is valid and hasn't been used already
    const validToken = await Token.findOne({ token });
    if (!validToken) throw invalidToken;
    if (validToken.authorizedEmail !== email) throw invalidSignupEmail;
    if (validToken.email) throw tokenAlreadyUsed;

    const existingUser = await User.findOne({ firstName, lastName });
    if (existingUser) throw usernameAlreadyTaken;

    // see if the token has expired
    const todaysDate = createDate();
    const expiration = createDate(validToken.expiration);
    if (todaysDate > expiration) throw expiredToken;

    // hash password before attempting to create the user
    const newPassword = await User.createPassword(password);

    // create new user
    const newUser = await User.create({
      ...req.body,
      password: newPassword,
      role: validToken.role,
      token: newToken,
      emailReminders: true,
      registered: createDate().toDate()
    });

    // assign signup token to current user
    await Token.updateOne({ token }, { email: newUser.email });

    // send an email template for a new user signup
    await Mail.create({
      sendTo: `${newUser.firstName} ${newUser.lastName} <${newUser.email}>`,
      sendFrom: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
      sendDate: createDate().toDate(),
      subject: "Welcome to the San Jose Sharks Ice Team!",
      message: newUserTemplate(newUser.firstName, newUser.lastName)
    });

    return res
      .status(201)
      .json({ message: thanksForReg(newUser.firstName, newUser.lastName) });
  } catch (err) {
    return sendError(err, 403, res);
  }
};

export default createUser;
