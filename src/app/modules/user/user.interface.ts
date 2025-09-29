export interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  photo?: string;
  role: Role;
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
