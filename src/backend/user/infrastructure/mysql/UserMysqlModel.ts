import { Column, Model, Table } from "sequelize-typescript";

import { IUser } from "../../domain/IUser";
import { IUserMysql } from "./IUserMysql";

@Table
export class UserMysqlModel extends Model<IUser, IUserMysql> {
	@Column({ primaryKey: true })
	uuid!: string;

	@Column
	userName!: string;

	@Column
	password!: string;
}
