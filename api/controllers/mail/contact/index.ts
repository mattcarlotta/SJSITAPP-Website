import type { Request, Response } from "express";
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import { Mail } from "~models";
import { createDate, getUsers, sendError } from "~helpers";
import {
  invalidContactUsRequest,
  unableToLocateMembers
} from "~messages/errors";

/**
 * Send an email to staff or admin.
 *
 * @function contactUs
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const contactUs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { message, sendTo, subject } = req.body;
    if (!message || !sendTo || !subject) throw invalidContactUsRequest;

    const role = sendTo.toLowerCase();

    const members = await getUsers({
      match: {
        role: { $eq: role }
      },
      project: {
        id: 1,
        email: {
          $concat: ["$firstName", " ", "$lastName", " ", "<", "$email", ">"]
        }
      }
    });
    /* istanbul ignore next */
    if (isEmpty(members)) throw unableToLocateMembers;

    const mailingAddresses = members.map(({ email }) => email);
    const firstName = get(req, ["session", "user", "firstName"]);
    const lastName = get(req, ["session", "user", "lastName"]);
    const email = get(req, ["session", "user", "email"]);

    await Mail.create({
      sendTo: mailingAddresses,
      sendFrom: `${firstName} ${lastName} <${email}>`,
      sendDate: createDate().toDate(),
      subject,
      message: `<span>${message}</span>`
    });

    return res.status(201).json({
      message: `Thank you for contacting us. The ${role} has received your message. Expect a response within 24 hours.`
    });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default contactUs;
