/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../../middlewares/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BlogService } from "./blog.service";

const createBlogCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await BlogService.createBlogCategory(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: `category created successfully`,
      data: category,
    });
  }
);

const getBlogCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await BlogService.getBlogCategories();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `Blog categories retrieved successfully`,
      data: category,
    });
  }
);

const createBlogPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await BlogService.createBlogPost(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: `Post created successfully`,
      data: post,
    });
  }
);
export const BlogController = {
  createBlogCategory,
  getBlogCategories,
  createBlogPost,
};
