import { Router } from "express";
import authRoutes from "./auth";
import dashboardRoutes from "./dashboard";
import eventRoutes from "./event";
import formRoutes from "./form";
import memberRoutes from "./member";
// import { requireAuth, requireStaffRole } from "~services/strategies";

const router = Router();

authRoutes(router);
dashboardRoutes(router);
eventRoutes(router);
formRoutes(router);
memberRoutes(router);
// EVENT

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

export default router;
