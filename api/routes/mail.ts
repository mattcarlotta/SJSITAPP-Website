import type { Router } from "express";
import {
  getAllMail,
  createMail,
  contactUs,
  deleteMail,
  deleteManyMails,
  getMailForViewing,
  resendMail,
  updateMail
} from "~controllers/mail";
// import { requireAuth, requireStaffRole } from "~services/strategies";

const mailRoutes = (router: Router): void => {
  router.get("/mail/all", getAllMail);
  router.post("/mail/create", createMail);
  router.post("/mail/contact", contactUs);
  router.delete("/mail/delete-many", deleteManyMails);
  router.delete("/mail/delete/:id", deleteMail);
  router.get("/mail/edit/:id", getMailForViewing);
  router.put("/mail/resend/:id", resendMail);
  router.put("/mail/update", updateMail);
};

export default mailRoutes;
