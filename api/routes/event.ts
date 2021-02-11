import type { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEventForViewing,
  resendEventEmail,
  getEventForScheduling,
  updateEventSchedule,
  updateEvent
} from "~controllers/event";
import {
  getAllEvents,
  deleteManyEvents,
  getScheduledEvents
} from "~controllers/events";
import { requireAuth, requireStaffRole } from "~services/strategies";

const eventRoutes = (router: Router): void => {
  router.post("/event/create", requireStaffRole, createEvent);
  router.delete("/event/delete/:id", requireStaffRole, deleteEvent);
  router.get("/event/edit/:id", requireStaffRole, getEventForViewing);
  router.put("/event/resend-email/:id", requireStaffRole, resendEventEmail);
  router.get("/event/review/:id", requireStaffRole, getEventForScheduling);
  router.put("/event/update/schedule", requireStaffRole, updateEventSchedule);
  router.put("/event/update", requireStaffRole, updateEvent);

  router.get("/events/viewall", requireStaffRole, getAllEvents);
  router.delete("/events/delete-many", requireStaffRole, deleteManyEvents);
  router.get("/events/schedule", requireAuth, getScheduledEvents);
};

export default eventRoutes;
