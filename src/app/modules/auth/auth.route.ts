import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.get("/me", AuthController.getMe);
router.post("/login", AuthController.credentialLogin);

export const AuthRoute = router;
