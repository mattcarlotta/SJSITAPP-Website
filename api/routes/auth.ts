import type { Router } from "express";
import {
  sendEmailResetToken,
  updatePassword,
  signin,
  signedin,
  signout,
  signup
} from "~controllers/auth";

const authRoutes = (router: Router): void => {
  router.put("/reset-password", sendEmailResetToken);
  router.put("/new-password", updatePassword);
  router.post("/signin", signin);
  router.get("/signedin", signedin);
  router.get("/signout", signout);
  router.post("/signup", signup);
};

export default authRoutes;
