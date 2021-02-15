import type { Router } from "express";
import {
  createSeason,
  deleteSeason,
  getSeasonForViewing,
  updateSeason
} from "~controllers/season";
import {
  getAllSeasons,
  getAllSeasonIds,
  deleteManySeasons
} from "~controllers/seasons";
import { requireStaffRole } from "~services/strategies";

const seasonRoutes = (router: Router): void => {
  router.post("/season/create", requireStaffRole, createSeason);
  router.delete("/season/delete/:id", requireStaffRole, deleteSeason);
  router.get("/season/edit/:id", requireStaffRole, getSeasonForViewing);
  router.put("/season/update", requireStaffRole, updateSeason);

  router.get("/seasons/viewall", requireStaffRole, getAllSeasons);
  router.get("/seasons/all/ids", requireStaffRole, getAllSeasonIds);
  router.delete("/seasons/delete-many", requireStaffRole, deleteManySeasons);
};

export default seasonRoutes;
