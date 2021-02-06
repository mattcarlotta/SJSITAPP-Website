import { Router } from "express";
import * as auth from "~controllers/auth";
import * as dashboard from "~controllers/dashboard";
import * as event from "~controllers/event";
import * as members from "~controllers/members";
// import { requireAuth, requireStaffRole } from "~services/strategies";

const router = Router();

// AUTH
router.put("/reset-password", auth.sendEmailResetToken);
router.put("/new-password", auth.updatePassword);
router.post("/signin", auth.signin);
router.get("/signedin", auth.signedin);
router.get("/signout", auth.signout);
router.post("/signup", auth.signup);

// DASHBOARD
router.get("/dashboard/ap-form", /* requireAuth */ dashboard.getAPForm);
router.get(
  "/dashboard/availability",
  /* requireAuth */ dashboard.getAvailability
);
router.get(
  "/dashboard/event-distribution",
  /* requireAuth */ dashboard.getEventDistribution
);
router.get(
  "/dashboard/events/:id",
  /* requireAuth */ dashboard.getSelectedEvents
);
router.get(
  "/dashboard/members-availability",
  /* requireAuth */ dashboard.getAvailabilityForAllMembers
);

// EVENT
router.post("/event/create", /* requireStaffRole */ event.createEvent);
router.delete("/event/delete/:id", /* requireStaffRole */ event.deleteEvent);
router.get("/event/edit/:id", /* requireStaffRole */ event.getEventForViewing);
router.put(
  "/event/resend-email/:id",
  /* requireStaffRole */ event.resendEventEmail
);
router.get(
  "/event/review/:id",
  /* requireStaffRole */ event.getEventForScheduling
);
router.put(
  "/event/update/schedule",
  /* requireStaffRole */ event.updateEventSchedule
);
router.put("/event/update", /* requireStaffRole */ event.updateEvent);

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
router.get("/members/all", /* requireStaffRole */ members.getAllMembers);
router.get(
  "/members/event-counts/:id",
  /* requireStaffRole */ members.getMemberEventCounts
);
router.get("/members/names", /* requireStaffRole */ members.getAllMemberNames);

export default router;
