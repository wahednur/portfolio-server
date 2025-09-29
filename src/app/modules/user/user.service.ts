/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcryptjs";
import { prisma } from "../../config/db";
import ApiError from "../../errorHelpers/ApiError";
import { createUserSchema } from "./user.validator";

const createUser = async (payload: unknown) => {
  const parsed = createUserSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ApiError(400, parsed.error.message);
  }
  const { name, email, password, photo, role } = parsed.data;

  const isExistUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (isExistUser) {
    throw new ApiError(409, "User already exist");
  }

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      photo,
      role,
    },
  });
  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

export const UserService = {
  createUser,
};
