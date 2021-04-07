import type { Router } from "express";
import {
  createSeason,
  deleteSeason,
  deleteManySeasons,
  getSeasonForViewing,
  getAllSeasons,
  getAllSeasonIds,
  updateSeason
} from "~controllers/seasons";
import { requireStaffRole } from "~services/strategies";

const seasonRoutes = (router: Router): void => {
  router.post("/seasons/create", requireStaffRole, createSeason);
  router.delete("/seasons/delete/:id", requireStaffRole, deleteSeason);
  router.get("/seasons/edit/:id", requireStaffRole, getSeasonForViewing);
  router.put("/seasons/update", requireStaffRole, updateSeason);

  router.get("/seasons/viewall", requireStaffRole, getAllSeasons);
  router.get("/seasons/all/ids", requireStaffRole, getAllSeasonIds);
  router.delete("/seasons/delete-many", requireStaffRole, deleteManySeasons);
};

export default seasonRoutes;
