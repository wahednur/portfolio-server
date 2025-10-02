/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../../middlewares/catchAsync";
import { createUserToken } from "../../utils/jwt/userToken";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthService.credentialLogin(req.body);
    const userToken = createUserToken(user);
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
    const { id } = req.body;
    const me = await AuthService.getMe(id);
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
