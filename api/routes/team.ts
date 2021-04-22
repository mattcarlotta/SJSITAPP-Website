import type { Router } from "express";
import {
  createTeam,
  deleteTeam,
  getAllTeamNames,
  deleteManyTeams
} from "~controllers/teams";
import { requireStaffRole } from "~services/strategies";

const teamRoutes = (router: Router): void => {
  router.post("/teams/create", requireStaffRole, createTeam);
  router.delete("/teams/delete/:id", requireStaffRole, deleteTeam);

  router.get("/teams/all", requireStaffRole, getAllTeamNames);
  router.delete("/teams/delete-many", requireStaffRole, deleteManyTeams);
};

export default teamRoutes;
