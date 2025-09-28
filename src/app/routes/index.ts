import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { BlogRoute } from "../modules/blog/blog.route";
import { PortfolioRoute } from "../modules/portfolio/portfolio.route";
import { UserRoute } from "../modules/user/user.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/user",
    route: UserRoute,
  },
  {
    path: "/portfolio",
    route: PortfolioRoute,
  },
  {
    path: "/blog",
    route: BlogRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
