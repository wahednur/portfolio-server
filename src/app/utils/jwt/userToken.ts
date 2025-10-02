import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../config/db";
import ApiError from "../../errorHelpers/ApiError";
import { IUser } from "../../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";

export const createUserToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user?.id,
    email: user?.email,
    role: user?.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    process.env.JWT_SECRET as string,
    process.env.JWT_EXP_IN as string
  );

  const refreshToken = generateToken(
    jwtPayload,
    process.env.JWT_REFRESH_SECRET as string,
    process.env.JWT_REFRESH_EXP_IN as string
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const verifyRefreshToken = verifyToken(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as string
  ) as JwtPayload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: verifyRefreshToken.email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist");
  }

  const jwtPayload = {
    userId: isUserExist?.id,
    email: isUserExist?.email,
    role: isUserExist?.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    process.env.JWT_SECRET as string,
    process.env.JWT_EXP_IN as string
  );
  return accessToken;
};
