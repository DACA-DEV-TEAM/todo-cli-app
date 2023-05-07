import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";

import { TaskMysqlModel } from "../../../task/infrastructure/mysql/TaskMysqlModel";
import { UserMysqlModel } from "../../../user/infrastructure/mysql/UserMysqlModel";

dotenv.config();

export const logBuffer: string[] = [];

const customLogger = (message: string) => {
	logBuffer.push(`\n [SQL][${new Date().toLocaleTimeString()}]${message}`);
};
export const sequelize = new Sequelize({
	database: process.env.DATABASE_NAME,
	dialect: "mysql",
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	logging: customLogger,
	storage: ":memory:",
	models: [UserMysqlModel, TaskMysqlModel], // or [Player, Team],
});
if (process.env.NODE_ENV !== "dev") {
	sequelize.options.logging = false;
}
