import { Router } from "express";
import { signedin, signin, signout, signup } from "~controllers/auth";
import {
  getAPForm,
  getAvailability,
  getEventDistribution,
  getSelectedEvents,
  getAvailabilityForAllMembers
} from "~controllers/dashboard";
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
  getAllMembers,
  getMemberEventCounts,
  getAllMemberNames
} from "~controllers/members";
import { localLogin, localSignup, requireRelogin } from "~services/strategies";

const router = Router();

// AUTH
router.post("/signin", localLogin, signin);
router.get("/signedin", requireRelogin, signedin);
router.get("/signout", signout);
router.post("/signup", localSignup, signup);

// DASHBOARD
router.get("/dashboard/ap-form", /* requireAuth */ getAPForm);
router.get("/dashboard/availability", /* requireAuth */ getAvailability);
router.get(
  "/dashboard/event-distribution",
  /* requireAuth */ getEventDistribution
);
router.get("/dashboard/events/:id", /* requireAuth */ getSelectedEvents);
router.get(
  "/dashboard/members-availability",
  /* requireAuth */ getAvailabilityForAllMembers
);

// EVENT
router.post("/event/create", /* requireStaffRole */ createEvent);
router.delete("/event/delete/:id", /* requireStaffRole */ deleteEvent);
router.get("/event/edit/:id", /* requireStaffRole */ getEventForViewing);
router.put("/event/resend-email/:id", /* requireStaffRole */ resendEventEmail);
router.get("/event/review/:id", /* requireStaffRole */ getEventForScheduling);
router.put(
  "/event/update/schedule",
  /* requireStaffRole */ updateEventSchedule
);
router.put("/event/update", /* requireStaffRole */ updateEvent);

// EVENTS
// router.get("/events/all", getAllEvents)
// router.delete("/events/delete-many", deleteManyEvents)
// router.get("/events/schedule", getScheduledEvents)

// FORM
// router.post("/form/create", createForm)
// router.delete("/form/delete/:id", deleteForm)
// router.get("/form/edit/:id", getFormForViewing)
// router.put("/form/resend-email/:id", resendFormEmails)
// router.put("/form/update/ap", updateApForm)
// router.put("/form/update", updateForm)
// router.get("/form/view/:id", viewApForm)

// FORMS
// router.get("/forms/all", getAllForms)
// router.delete("/forms/delete-many", deleteManyEvents)

// MAIL
// router.get("/mail/all", getAllMail)
// router.post("/mail/create", createMail)
// router.post("/mail/contact", contactUs)
// router.delete("/mail/delete/:id", deleteMail)
// router.get("/mail/edit/:id", getMailForViewing)
// router.put("/mail/resend/:id", resendMail)
// router.put("/mail/update", updateMail)

// MAILS
// router.delete("/mails/delete-many", deleteManyMails)

// MEMBERS
router.get("/members/all", /* requireStaffRole */ getAllMembers);
router.get(
  "/members/event-counts/:id",
  /* requireStaffRole */ getMemberEventCounts
);
router.get("/members/names", /* requireStaffRole */ getAllMemberNames);

export default router;
