import dotenv from "dotenv";

import connectMongoDB from "../../shared/infrastructure/db/connectMongoDB";
import TaskRepository from "../domain/TaskRepository";
import JsonTaskRepository from "../infrastructure/json/JsonTaskRepository";
import { MongoTaskRepository } from "../infrastructure/mongo/MongoTaskRepository";

dotenv.config();

export class TaskSwitchRepository {
	constructor(
		private readonly jsonTaskRepository: JsonTaskRepository,
		private readonly mongoTaskRepository: MongoTaskRepository //, sequalizeTaskRepository: SequalizeTaskRepository
	) {}

	public switchRepository(db?: string): TaskRepository {
		switch (db) {
			case "JSON":
				return this.jsonTaskRepository;

			case "MongoDB":
				try {
					connectMongoDB;

					return this.mongoTaskRepository;
				} catch (error) {
					console.log(
						"Error: there was a problem connecting to MongoDB. You will be redirected to JSON."
					);

					return this.jsonTaskRepository;
				}
			/* case "MySQL":
        try {
          sequalize.authenticate();

          return this.sequalizeTaskRepository;
        } catch (error) {
          console.log(
            "Error: there was a problem connecting to MySQL. You will be redirected to JSON."
          );

          return this.jsonUserRepository;
        }
				break; */

			default:
				return this.jsonTaskRepository;
				break;
		}
	}
}
