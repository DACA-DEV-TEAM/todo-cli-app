import { Column, DataType, Model, Table } from "sequelize-typescript";

import { ITask } from "../../domain/ITask";
import { TaskStatus } from "../../domain/TaskStatus";
import { ITaskMysql } from "./ITaskMysql";

@Table({ timestamps: false, tableName: "tasks" })
export class TaskMysqlModel extends Model<ITask, ITaskMysql> {
	@Column({ primaryKey: true })
	uuid!: string;

	@Column
	description!: string;

	@Column
	userId!: string;

	@Column(DataType.ENUM(TaskStatus.PENDING, TaskStatus.ON_GOING, TaskStatus.COMPLETED))
	status!: TaskStatus;

	@Column(DataType.DATE)
	startTime!: Date;

	@Column(DataType.DATE)
	endTime!: Date | null;
}
