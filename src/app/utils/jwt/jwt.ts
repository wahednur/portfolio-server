import jwt, { SignOptions } from "jsonwebtoken";
import { DecodedUser } from "../../../types/auth";

export const generateToken = (
  payload: DecodedUser,
  secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);
  return token;
};

export const verifyToken = (token: string, secret: string): DecodedUser => {
  const verifyToken = jwt.verify(token, secret) as DecodedUser;
  return verifyToken;
};
