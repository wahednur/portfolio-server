/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthService.credentialLogin(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Login successfully",
      data: user,
    });
  }
);

export const AuthController = {
  credentialLogin,
};
