import type { Router } from "express";
import {
  createService,
  getServiceForViewing,
  updateService
} from "~controllers/services";
import { requireStaffRole } from "~services/strategies";

const mailRoutes = (router: Router): void => {
  router.post("/service/create", requireStaffRole, createService);
  router.get("/service/view", requireStaffRole, getServiceForViewing);
  router.put("/service/update", requireStaffRole, updateService);
};

export default mailRoutes;
