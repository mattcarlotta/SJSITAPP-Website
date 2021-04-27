import type { Request, Response } from "express";
import { Service } from "~models";
import { isValidObjectId, isUndefined, sendError } from "~helpers";
import { unableToLocateService, unableToUpdateService } from "~messages/errors";

/**
 * Updates the service.
 *
 * @function updateService
 * @returns {Response} - message
 * @throws {ResponseError}
 */
const updateService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      id: _id,
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
      !isValidObjectId(_id) ||
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
      throw unableToUpdateService;

    const existingService = await Service.findOne({ _id });
    if (!existingService) throw unableToLocateService;

    await existingService.updateOne({
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
    });

    return res
      .status(200)
      .json({ message: "Successfully updated the services!" });
  } catch (err) {
    return sendError(err, 400, res);
  }
};

export default updateService;
