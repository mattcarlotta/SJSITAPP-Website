import type { Router } from "express";
import {
  getAllMembers,
  getMemberEventCounts,
  getAllMemberNames
} from "~controllers/members";

const memberRoutes = (router: Router): void => {
  router.get("/members/all", /* requireStaffRole */ getAllMembers);
  router.get(
    "/members/event-counts/:id",
    /* requireStaffRole */ getMemberEventCounts
  );
  router.get("/members/names", /* requireStaffRole */ getAllMemberNames);
};

export default memberRoutes;
