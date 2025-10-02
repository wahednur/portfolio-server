import { Prisma } from "@prisma/client";
import httpStatus from "http-status-codes";
import { prisma } from "../../config/db";
import ApiError from "../../errorHelpers/ApiError";

const createBlogCategory = async (payload: Prisma.BlogCategoryCreateInput) => {
  const isExist = await prisma.blogCategory.findUnique({
    where: {
      name: payload.name,
    },
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `${payload.name} category is already exist`
    );
  }
  const category = await prisma.blogCategory.create({
    data: payload,
  });
  return category;
};

const getBlogCategories = async () => {
  const category = await prisma.blogCategory.findMany();
  return category;
};

const createBlogPost = async (payload: Prisma.PostCreateInput) => {
  const post = await prisma.post.create({
    data: payload,
  });
  return post;
};

export const BlogService = {
  createBlogCategory,
  getBlogCategories,
  createBlogPost,
};
