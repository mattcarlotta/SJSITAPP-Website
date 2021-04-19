import type { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEventForViewing,
  resendEventEmail,
  getEventForScheduling,
  updateEventSchedule,
  updateEvent,
  getAllEvents,
  getMemberEventsAvailability,
  deleteManyEvents,
  getEventResponses,
  getScheduledEvents
} from "~controllers/events";
import { requireAuth, requireStaffRole } from "~services/strategies";

const eventRoutes = (router: Router): void => {
  router.post("/events/create", requireStaffRole, createEvent);
  router.delete("/events/delete/:id", requireStaffRole, deleteEvent);
  router.get("/events/edit/:id", requireStaffRole, getEventForViewing);
  router.put("/events/resend-email/:id", requireStaffRole, resendEventEmail);
  router.get("/events/review/:id", requireStaffRole, getEventForScheduling);
  router.put("/events/update/schedule", requireStaffRole, updateEventSchedule);
  router.put("/events/update", requireStaffRole, updateEvent);

  router.get("/events/viewall", requireStaffRole, getAllEvents);
  router.delete("/events/delete-many", requireStaffRole, deleteManyEvents);
  router.get("/events/availability", requireAuth, getMemberEventsAvailability);
  router.get("/events/responses", requireAuth, getEventResponses);
  router.get("/events/schedule", requireAuth, getScheduledEvents);
};

export default eventRoutes;
