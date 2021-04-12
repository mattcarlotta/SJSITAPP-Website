import type { Request, Response } from "express";
import { Mail, User } from "~models";
import { createDate, parseSession, sendError } from "~helpers";
import { unableToCreateNewMail, unableToLocateMember } from "~messages/errors";

/**
 * Creates a new mail.
 *
 * @function createMail
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const createMail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const _id = parseSession(req);
    const { message, sendTo, subject } = req.body;
    if (!message || !sendTo || !subject) throw unableToCreateNewMail;

    const existingMember = await User.findOne(
      { _id },
      { email: 1, firstName: 1, lastName: 1 }
    );
    /* istanbul ignore next */
    if (!existingMember) throw unableToLocateMember;
    const sendFrom = `${existingMember.firstName} ${existingMember.lastName} <${existingMember.email}>`;

    await Mail.create({
      message,
      sendDate: createDate().format(),
      sendFrom,
      sendTo,
      subject
    });

    return res.status(201).json({
      message: "An email has been created and will be sent shortly!"
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default createMail;
