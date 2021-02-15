import type { Router } from "express";
import { createTeam, deleteTeam } from "~controllers/team";
import { getAllTeamNames, deleteManyTeams } from "~controllers/teams";
import { requireStaffRole } from "~services/strategies";

const teamRoutes = (router: Router): void => {
  router.post("/team/create", requireStaffRole, createTeam);
  router.delete("/team/delete/:id", requireStaffRole, deleteTeam);

  router.get("/teams/viewall", requireStaffRole, getAllTeamNames);
  router.delete("/teams/delete-many", requireStaffRole, deleteManyTeams);
};

export default teamRoutes;
