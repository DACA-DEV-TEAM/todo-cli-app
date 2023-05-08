import { Document } from "mongoose";

import { IUser } from "../../domain/IUser";

export interface IUserMongo extends IUser, Document {}
