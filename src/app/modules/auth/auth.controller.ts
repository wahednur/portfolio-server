/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../../middlewares/catchAsync";
import ApiError from "../../errorHelpers/ApiError";
import { setAuthCookie } from "../../utils/jwt/setCookies";
import { createUserToken } from "../../utils/jwt/userToken";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthService.credentialLogin(req.body);
    const userToken = createUserToken(user);
    setAuthCookie(res, userToken);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Login successfully",
      data: {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: user,
      },
    });
  }
);

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.user?.email;

    if (!email) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User email not found");
    }
    const me = await AuthService.getMe(email);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User data successfully retrieve",
      data: me,
    });
  }
);

export const AuthController = {
  credentialLogin,
  getMe,
};
