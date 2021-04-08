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
import { requireAuth, requireStaffRole } from "~services/strategies";

const mailRoutes = (router: Router): void => {
  router.get("/mail/viewall", requireStaffRole, getAllMail);
  router.post("/mail/create", requireStaffRole, createMail);
  router.post("/mail/contact", requireAuth, contactUs);
  router.delete("/mail/delete-many", requireStaffRole, deleteManyMails);
  router.delete("/mail/delete/:id", requireStaffRole, deleteMail);
  router.get("/mail/edit/:id", requireStaffRole, getMailForViewing);
  router.put("/mail/resend-email/:id", requireStaffRole, resendMail);
  router.put("/mail/update", requireStaffRole, updateMail);
};

export default mailRoutes;
