import { Role } from "@prisma/client";
import { Router } from "express";
import { checkAuth } from "../../../middlewares/checkAuth";
import { PortfolioController } from "./portfolio.controller";

const router = Router();

router.get("/cat", checkAuth(Role.USER), PortfolioController.getCategories);
router.get("/", checkAuth(Role.USER), PortfolioController.getPortfolios);

router.post("/create", checkAuth("USER"), PortfolioController.createPortfolio);
router.post(
  "/cat/create",
  checkAuth("USER"),
  PortfolioController.createCategory
);

export const PortfolioRoute = router;
