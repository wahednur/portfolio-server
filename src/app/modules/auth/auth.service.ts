/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcryptjs";
import statusCode from "http-status-codes";
import { prisma } from "../../config/db";
import ApiError from "../../errorHelpers/ApiError";
import { IUser, Role } from "../user/user.interface";
const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const existUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  const passMatch = await bcrypt.compare(
    password as string,
    existUser?.password as string
  );
  if (!passMatch) {
    throw new ApiError(statusCode.BAD_REQUEST, "Password not matched");
  }
  const jwtPayload = {
    userId: existUser?.id,
    email: existUser?.email,
    name: existUser?.name,
    role: existUser?.role as Role | undefined,
  };

  return jwtPayload;
};

const getMe = async (id: string) => {
  const me = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!me) return null;
  const { password, ...userInfo } = me;
  return userInfo;
};

export const AuthService = {
  credentialLogin,
  getMe,
};
