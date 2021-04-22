import type { Router } from "express";
import {
  createToken,
  deleteToken,
  getTokenForViewing,
  resendToken,
  updateToken,
  getAllTokens,
  deleteManyTokens
} from "~controllers/tokens";
import { requireStaffRole } from "~services/strategies";

const tokenRoutes = (router: Router): void => {
  router.post("/tokens/create", requireStaffRole, createToken);
  router.delete("/tokens/delete/:id", requireStaffRole, deleteToken);
  router.get("/tokens/edit/:id", requireStaffRole, getTokenForViewing);
  router.put("/tokens/resend-email/:id", requireStaffRole, resendToken);
  router.put("/tokens/update", requireStaffRole, updateToken);

  router.get("/tokens/viewall", requireStaffRole, getAllTokens);
  router.delete("/tokens/delete-many", requireStaffRole, deleteManyTokens);
};

export default tokenRoutes;
