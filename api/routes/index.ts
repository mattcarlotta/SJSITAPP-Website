import { Router } from "express";
import { getAllMembers } from "~controllers/members";

const router = Router();

// DASHBOARD
// router.get("/dashboard/ap-form", getAPForm)
// router.get("/dashboard/availability", getAvailability)
// router.get("/dashboard/event-distribution", getEventDistribution)
// router.get("/dashboard/events/:id", getEventDistribution)
// router.get("/dashboard/members-availability", getAvailabilityForAllMembers)

// EVENT
// router.post("/event/create", createEvent)
// router.delete("/event/delete/:id", deleteEvent)
// router.get("/event/edit/:id", getEventForViewing)
// router.put("/event/resend-email/:id", resendEventEmail)
// router.get("/event/review/:id", getEventForScheduling)
// router.put("/event/update/schedule", updateEventSchedule)
// router.put("/event/update", updateEvent)

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
router.get("/members/all", /* requiresStaffCredentials */ getAllMembers);

export default router;
