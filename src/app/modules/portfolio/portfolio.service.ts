import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import ApiError from "../../errorHelpers/ApiError";

const createPortfolio = async (payload: Prisma.PortfolioCreateInput) => {
  const portfolio = await prisma.portfolio.create({
    data: payload,
  });
  return portfolio;
};

const createCategory = async (payload: Prisma.CategoryCreateInput) => {
  const isExist = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
  });
  if (isExist) {
    throw new ApiError(401, "Category already exist");
  }

  const category = await prisma.category.create({
    data: payload,
  });

  return category;
};

const getCategories = async () => {
  const category = await prisma.category.findMany();
  return category;
};
const getPortfolios = async () => {
  const portfolios = await prisma.portfolio.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return portfolios;
};

export const PortfolioService = {
  createPortfolio,
  createCategory,
  getCategories,
  getPortfolios,
};
