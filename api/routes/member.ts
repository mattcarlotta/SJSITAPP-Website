import type { Router } from "express";
import {
  deleteMember,
  getMember,
  getMemberEvents,
  // getMemberSettingsEvents,
  updateMemberSettings,
  getMemberSettings,
  updateMember,
  updateMemberStatus
} from "~controllers/member";
import {
  getAllMembers,
  getMemberEventCounts,
  getAllMemberNames
} from "~controllers/members";
import { requireAuth, requireStaffRole } from "~services/strategies";

const memberRoutes = (router: Router): void => {
  router.delete("/member/delete/:id", requireStaffRole, deleteMember);
  router.get("/member/events", requireStaffRole, getMemberEvents);
  router.get("/member/review/:id", requireStaffRole, getMember);

  // loggedin member settings
  router.put("/member/settings/update", requireAuth, updateMemberSettings);
  router.get("/member/settings", requireAuth, getMemberSettings);

  // staff member override settings
  router.put("/member/update", requireStaffRole, updateMember);
  router.put("/member/update-status", requireStaffRole, updateMemberStatus);

  router.get("/members/viewall", requireStaffRole, getAllMembers);
  router.get(
    "/members/event-counts/:id",
    requireStaffRole,
    getMemberEventCounts
  );
  router.get("/members/names", requireStaffRole, getAllMemberNames);
};

export default memberRoutes;
