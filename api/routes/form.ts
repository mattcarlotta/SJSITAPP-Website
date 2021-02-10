import type { Router } from "express";
import {
  createForm,
  deleteForm,
  getFormForViewing,
  resendFormEmail,
  updateApForm,
  updateForm,
  viewApForm
} from "~controllers/form";
import { getAllForms, deleteManyForms } from "~controllers/forms";
import { requireAuth, requireStaffRole } from "~services/strategies";

const formRoutes = (router: Router): void => {
  router.post("/form/create", requireStaffRole, createForm);
  router.delete("/form/delete/:id", requireStaffRole, deleteForm);
  router.get("/form/edit/:id", requireStaffRole, getFormForViewing);
  router.put("/form/resend-email/:id", requireStaffRole, resendFormEmail);
  router.put("/form/update/ap", requireAuth, updateApForm);
  router.put("/form/update", requireStaffRole, updateForm);
  router.get("/form/view/:id", requireAuth, viewApForm);

  // FORMS
  router.get("/forms/all", requireStaffRole, getAllForms);
  router.delete("/forms/delete-many", requireStaffRole, deleteManyForms);
};

export default formRoutes;
