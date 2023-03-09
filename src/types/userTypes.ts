import { User } from "@prisma/client";

export interface UserBody extends Omit<User, "id"> {};