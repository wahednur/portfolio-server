import { Role } from "@prisma/client";
import { Router } from "express";
import { checkAuth } from "../../../middlewares/checkAuth";
import { AuthController } from "./auth.controller";

const router = Router();

router.get("/me", checkAuth(Role.ADMIN, Role.USER), AuthController.getMe);
router.post("/login", AuthController.credentialLogin);

export const AuthRoute = router;
