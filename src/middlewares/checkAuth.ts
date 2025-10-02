import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../app/config/db";
import ApiError from "../app/errorHelpers/ApiError";
import { verifyToken } from "../app/utils/jwt/jwt";

export const checkAuth = (...authRoles: string[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token: string | undefined;
      if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies?.accesstoken) {
        token = req.cookies.accesstoken;
      } else if (req.headers["accesstoken"]) {
        token = req.headers["accesstoken"] as string;
      }

      // const accessToken = req.headers.authorization || req.cookies.accessToken;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "No token received");
      }

      const verifiedToken = verifyToken(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      const isUserExist = await prisma.user.findUnique({
        where: {
          email: verifiedToken.email,
        },
      });

      if (!isUserExist) {
        throw new ApiError(httpStatus.FORBIDDEN, "User not found");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          "You are not permitted to view this route!!!"
        );
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      console.log("JWT error:", error);
      next(error);
    }
  };
};
