import type { Router } from "express";
import {
  createForm,
  deleteForm,
  deleteManyForms,
  getAllForms,
  getFormForViewing,
  resendFormEmail,
  updateApForm,
  updateForm,
  viewApForm
} from "~controllers/forms";
import { requireAuth, requireStaffRole } from "~services/strategies";

const formRoutes = (router: Router): void => {
  router.post("/forms/create", requireStaffRole, createForm);
  router.delete("/forms/delete/:id", requireStaffRole, deleteForm);
  router.get("/forms/edit/:id", requireStaffRole, getFormForViewing);
  router.put("/forms/resend-email/:id", requireStaffRole, resendFormEmail);
  router.put("/forms/update/ap", requireAuth, updateApForm);
  router.put("/forms/update", requireStaffRole, updateForm);
  router.get("/forms/view/:id", requireAuth, viewApForm);

  // FORMS
  router.get("/forms/viewall", requireStaffRole, getAllForms);
  router.delete("/forms/delete-many", requireStaffRole, deleteManyForms);
};

export default formRoutes;
