import get from "lodash.get";
import type { Request, Response } from "express";
import { Event } from "~models";
import {
  generateFilters,
  sendError,
  sortScheduledUsersByLastName
} from "~helpers";

/**
 * Retrieves all events for ViewEvents page.
 *
 * @function getAllEvents
 * @returns {Response} - { events: sorted events, totalDocs: number }
 * @throws {ResponseError}
 */
const getAllEvents = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { page } = req.query;

    const filters = generateFilters(req.query);

    const results = await Event.paginate(
      { ...filters },
      {
        lean: true,
        sort: { seasonId: -1, eventDate: -1 },
        page: parseInt(String(page || "1"), 10),
        limit: 10,
        select: "-schedule -__v",
        populate: {
          path: "scheduledIds",
          select: "firstName lastName"
        }
      }
    );

    const docs = get(results, ["docs"]);
    const totalDocs = get(results, ["totalDocs"]);

    return res
      .status(200)
      .json({ docs: sortScheduledUsersByLastName(docs), totalDocs });
  } catch (err) {
    /* istanbul ignore next */
    return sendError(err, 400, res);
  }
};

export default getAllEvents;
