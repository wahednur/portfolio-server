/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../../middlewares/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PortfolioService } from "./portfolio.service";

const createPortfolio: RequestHandler = catchAsync(async (req, res, next) => {
  const portfolio = await PortfolioService.createPortfolio(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Portfolio created successfully",
    data: portfolio,
  });
});
const createCategory: RequestHandler = catchAsync(async (req, res, next) => {
  const category = await PortfolioService.createCategory(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "category created successfully",
    data: category,
  });
});
const getCategories: RequestHandler = catchAsync(async (req, res, next) => {
  const category = await PortfolioService.getCategories();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "category created successfully",
    data: category,
  });
});
const getPortfolios: RequestHandler = catchAsync(async (req, res, next) => {
  const category = await PortfolioService.getPortfolios();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "category created successfully",
    data: category,
  });
});

export const PortfolioController = {
  createPortfolio,
  createCategory,
  getCategories,
  getPortfolios,
};
