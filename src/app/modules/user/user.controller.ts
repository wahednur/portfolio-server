/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import statusCode from "http-status-codes";
import { catchAsync } from "../../../middlewares/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: `${user.name} account created successfully`,
      data: user,
    });
  }
);

export const UserController = {
  createUser,
};
