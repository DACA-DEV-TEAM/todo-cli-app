/* eslint-disable @typescript-eslint/no-empty-interface */
import { Optional } from "sequelize";

import { ITask } from "../../domain/ITask";

export interface ITaskMysql extends Optional<ITask, "uuid"> {}
