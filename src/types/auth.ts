import { JwtPayload } from "jsonwebtoken";

export interface DecodedUser extends JwtPayload {
  id: string;
  email: string;
  role: string;
}
