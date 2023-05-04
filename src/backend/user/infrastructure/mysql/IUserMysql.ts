/* eslint-disable @typescript-eslint/no-empty-interface */
import { Optional } from "sequelize";

import { IUser } from "../../domain/IUser";

export interface IUserMysql extends Optional<IUser, "uuid"> {}
