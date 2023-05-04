import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";

import { UserMysqlModel } from "../../../user/infrastructure/mysql/UserMysqlModel";

dotenv.config();

export const sequelize = new Sequelize({
	database: process.env.DATABASE_NAME,
	dialect: "mysql",
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	logging: (...msg) => console.log(`\n [SQL][${new Date().toLocaleTimeString()}]${msg}`),
	storage: ":memory:",
	models: [UserMysqlModel], // or [Player, Team],
});
if (process.env.NODE_ENV !== "dev") {
	sequelize.options.logging = false;
}
