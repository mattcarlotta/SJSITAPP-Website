import { Router } from "express";
import authRoutes from "./auth";
import dashboardRoutes from "./dashboard";
import eventRoutes from "./event";
import formRoutes from "./form";
import mailRoutes from "./mail";
import memberRoutes from "./member";
import seasonRoutes from "./season";
import serviceRoutes from "./service";
import teamRoutes from "./team";
import tokenRoutes from "./token";

const router = Router();

authRoutes(router);
dashboardRoutes(router);
eventRoutes(router);
formRoutes(router);
mailRoutes(router);
memberRoutes(router);
seasonRoutes(router);
serviceRoutes(router);
teamRoutes(router);
tokenRoutes(router);

export default router;
