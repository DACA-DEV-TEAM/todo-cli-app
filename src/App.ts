import { UuidService } from "./backend/shared/application/UuidService";
import { TaskService } from "./backend/task/application/TaskService";
import JsonTaskRepository from "./backend/task/infrastructure/json/JsonTaskRepository";
import { TaskController } from "./backend/task/infrastructure/TaskController";
import { BcryptService } from "./backend/user/application/BcryptService";
import { UserService } from "./backend/user/application/UserService";
import { UserSwitchRepository } from "./backend/user/application/UserSwitchRepository";
import JsonUserRepository from "./backend/user/infrastructure/json/JsonUserRepository";
import { MongoUserRepository } from "./backend/user/infrastructure/mongo/MongoUserRepository";
import { UserController } from "./backend/user/infrastructure/UserController";
import Inquirer from "./cli/inquirer.start";

const taskPath = "./src/backend/task/infrastructure/json/taskDb.json";
const userPath = "./src/backend/user/infrastructure/json/userDb.json";
const jsonTaskStorage = new JsonTaskRepository(taskPath);
const jsonUserStorage = new JsonUserRepository(userPath);
const mongoUserStorage = new MongoUserRepository();
const userSwitchRepository = new UserSwitchRepository(jsonUserStorage, mongoUserStorage);
const uuidService = new UuidService();
const bcryptService = new BcryptService();
const userService = new UserService(bcryptService, uuidService, userSwitchRepository);
const taskService = new TaskService(jsonTaskStorage, uuidService);
const userController = new UserController(userService);
const taskController = new TaskController(taskService);
const inquirer = new Inquirer(userController, taskController);
//TODO: add connectMongoDB and sequelize
//connectMongoDB;
inquirer.start();
