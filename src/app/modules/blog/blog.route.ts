import { Role } from "@prisma/client";
import { Router } from "express";
import { checkAuth } from "../../../middlewares/checkAuth";
import { BlogController } from "./blog.controller";

const router = Router();
router.get(
  "/cat",
  checkAuth(Role.ADMIN, Role.USER),
  BlogController.getBlogCategories
);
router.post(
  "/cat/create",
  checkAuth(Role.USER, Role.ADMIN),
  BlogController.createBlogCategory
);
router.post(
  "/create",
  checkAuth(Role.USER, Role.ADMIN),
  BlogController.createBlogPost
);

export const BlogRoute = router;
