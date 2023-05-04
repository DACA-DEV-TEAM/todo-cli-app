import { Document } from "mongoose";

import { ITask } from "../../domain/ITask";

export interface ITaskMongo extends ITask, Document {}
