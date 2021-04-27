import type { Request, Response } from "express";
import { Service } from "~models";
import { isUndefined, moment, sendError } from "~helpers";
import { unableToCreateNewService } from "~messages/errors";

/**
 * Creates a new service.
 *
 * @function createService
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const createService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      automatedOnline,
      emailOnline,
      eventOnline,
      eventDay,
      eventTime,
      formReminderOnline,
      formReminderDay,
      formReminderTime,
      scheduleOnline,
      scheduleDay,
      scheduleTime
    } = req.body;
    if (
      isUndefined(automatedOnline) ||
      isUndefined(emailOnline) ||
      isUndefined(eventOnline) ||
      !eventDay ||
      !eventTime ||
      isUndefined(formReminderOnline) ||
      !formReminderDay ||
      !formReminderTime ||
      isUndefined(scheduleOnline) ||
      !scheduleDay ||
      !scheduleTime
    )
      throw unableToCreateNewService;

    const month = moment().format("MMMM");

    await Service.create({
      automatedOnline,
      emailOnline,
      eventOnline,
      eventDay,
      eventMonth: month,
      eventTime,
      formReminderOnline,
      formReminderDay,
      formReminderMonth: month,
      formReminderTime,
      scheduleOnline,
      scheduleDay,
      scheduleMonth: month,
      scheduleTime
    });

    return res
      .status(201)
      .json({ message: "Successfully created the services!" });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default createService;
