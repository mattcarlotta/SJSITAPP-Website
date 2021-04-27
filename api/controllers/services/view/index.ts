import type { Request, Response } from "express";
import { Service } from "~models";
import { sendError } from "~helpers";

/**
 * Retrieves the single service for editing/viewing.
 *
 * @function getServiceForViewing
 * @returns {Response} - service
 * @throws {ResponseError}
 */
const getServiceForViewing = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try {
    const existingService = await Service.findOne().limit(1).lean();

    return res.status(200).send(existingService);
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, 400, res);
  }
};

export default getServiceForViewing;
