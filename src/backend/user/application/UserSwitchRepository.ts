import dotenv from "dotenv";

import connectMongoDB from "../../shared/infrastructure/db/connectMongoDB";
import UserRepository from "../domain/UserRepository";
import JsonUserRepository from "../infrastructure/json/JsonUserRepository";
import { MongoUserRepository } from "../infrastructure/mongo/MongoUserRepository";

dotenv.config();

export class UserSwitchRepository {
	constructor(
		private readonly jsonUserRepository: JsonUserRepository,
		private readonly mongoUserRepository: MongoUserRepository //, sequalizeUserRepository: SequalizeUserRepository
	) {}

	public switchRepository(db?: string): UserRepository {
		switch (db) {
			case "JSON":
				return this.jsonUserRepository;

			case "MongoDB":
				try {
					connectMongoDB;

					return this.mongoUserRepository;
				} catch (error) {
					console.log(
						"Error: there was a problem connecting to MongoDB. You will be redirected to JSON."
					);

					return this.jsonUserRepository;
				}
			/* case "MySQL":
        try {
          sequalize.authenticate();

          return this.sequalizeUserRepository;
        } catch (error) {
          console.log(
            "Error: there was a problem connecting to MySQL. You will be redirected to JSON."
          );

          return this.jsonUserRepository;
        }
				break; */

			default:
				return this.jsonUserRepository;
				break;
		}
	}
}
