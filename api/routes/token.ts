import type { Router } from "express";
import {
  createToken,
  deleteToken,
  getTokenForViewing,
  resendToken,
  updateToken
} from "~controllers/token";
import { getAllTokens, deleteManyTokens } from "~controllers/tokens";
import { requireStaffRole } from "~services/strategies";

const tokenRoutes = (router: Router): void => {
  router.post("/token/create", requireStaffRole, createToken);
  router.delete("/token/delete/:id", requireStaffRole, deleteToken);
  router.get("/token/edit/:id", requireStaffRole, getTokenForViewing);
  router.put("/token/resend-email/:id", requireStaffRole, resendToken);
  router.put("/token/update", requireStaffRole, updateToken);

  router.get("/tokens/viewall", requireStaffRole, getAllTokens);
  router.delete("/tokens/delete-many", requireStaffRole, deleteManyTokens);
};

export default tokenRoutes;
