import type { Router } from "express";
import {
  createToken,
  deleteToken,
  getTokenForViewing,
  resendToken,
  updateToken
} from "~controllers/token";
import { getAllTokens, deleteManyTokens } from "~controllers/tokens";
// import { requireStaffRole } from "~services/strategies";

const tokenRoutes = (router: Router): void => {
  router.post("/token/create", /* requireStaffRole */ createToken);
  router.delete("/token/delete/:id", /* requireStaffRole */ deleteToken);
  router.get("/form/edit/:id", /* requireStaffRole */ getTokenForViewing);
  router.put("/form/resend-email/:id", /* requireStaffRole */ resendToken);
  router.put("/form/update/ap", /* requireAuth */ updateToken);

  router.get("/tokens/all", /* requireStaffRole */ getAllTokens);
  router.delete("/tokens/delete-many", /* requireStaffRole */ deleteManyTokens);
};

export default tokenRoutes;
