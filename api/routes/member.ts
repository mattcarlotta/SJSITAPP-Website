import type { Router } from "express";
import {
  deleteMember,
  getMember,
  getMemberEvents,
  // getMemberSettingsEvents,
  updateMemberSettings,
  getMemberSettings,
  updateMember,
  updateMemberStatus,
  getAllMembers,
  getMemberEventCounts,
  getAllMemberEmails
} from "~controllers/members";
import { requireAuth, requireStaffRole } from "~services/strategies";

const memberRoutes = (router: Router): void => {
  router.delete("/members/delete/:id", requireStaffRole, deleteMember);
  router.get("/members/events", requireStaffRole, getMemberEvents);
  router.get("/members/review/:id", requireStaffRole, getMember);

  // loggedin members settings
  router.put("/members/settings/update", requireAuth, updateMemberSettings);
  router.get("/members/settings", requireAuth, getMemberSettings);

  // staff members override settings
  router.put("/members/update", requireStaffRole, updateMember);
  router.put("/members/update-status", requireStaffRole, updateMemberStatus);

  router.get("/members/viewall", requireStaffRole, getAllMembers);
  router.get(
    "/members/event-counts/:id",
    requireStaffRole,
    getMemberEventCounts
  );
  router.get("/members/emails", requireStaffRole, getAllMemberEmails);
};

export default memberRoutes;
