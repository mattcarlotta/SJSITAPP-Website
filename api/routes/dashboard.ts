import type { Router } from "express";
import {
  getAPForm,
  getAvailability,
  getEventDistribution,
  getSelectedEvents,
  getAvailabilityForAllMembers
} from "~controllers/dashboard";

const dashboardRoutes = (router: Router): void => {
  router.get("/dashboard/ap-form", /* requireAuth */ getAPForm);
  router.get("/dashboard/availability", /* requireAuth */ getAvailability);
  router.get(
    "/dashboard/event-distribution",
    /* requireAuth */ getEventDistribution
  );
  router.get("/dashboard/events/:id", /* requireAuth */ getSelectedEvents);
  router.get(
    "/dashboard/members-availability",
    /* requireAuth */ getAvailabilityForAllMembers
  );
};

export default dashboardRoutes;
