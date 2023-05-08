import { UuidService } from "./backend/shared/application/UuidService";
import { TaskService } from "./backend/task/application/TaskService";
import JsonTaskRepository from "./backend/task/infrastructure/json/JsonTaskRepository";
import { MongoTaskRepository } from "./backend/task/infrastructure/mongo/MongoTaskRepository";
import { TaskMysqlRepository } from "./backend/task/infrastructure/mysql/TaskMysqlRepository";
import { TaskController } from "./backend/task/infrastructure/TaskController";
import { TaskSwitchRepository } from "./backend/task/infrastructure/TaskSwitchRepository";
import { BcryptService } from "./backend/user/application/BcryptService";
import { UserService } from "./backend/user/application/UserService";
import JsonUserRepository from "./backend/user/infrastructure/json/JsonUserRepository";
import { MongoUserRepository } from "./backend/user/infrastructure/mongo/MongoUserRepository";
import { UserMysqlRepository } from "./backend/user/infrastructure/mysql/UserMysqlRepository";
import { UserController } from "./backend/user/infrastructure/UserController";
import { UserSwitchRepository } from "./backend/user/infrastructure/UserSwitchRepository";
import Inquirer from "./cli/inquirer.start";

const taskPath = "./src/backend/task/infrastructure/json/taskDb.json";
const userPath = "./src/backend/user/infrastructure/json/userDb.json";
const jsonTaskStorage = new JsonTaskRepository(taskPath);
const jsonUserStorage = new JsonUserRepository(userPath);

const mongoUserStorage = new MongoUserRepository();
const mongoTaskStorage = new MongoTaskRepository();

const userMysqlRepository = new UserMysqlRepository();
const taskMysqlRepository = new TaskMysqlRepository();

const taskSwitchRepository = new TaskSwitchRepository(
	jsonTaskStorage,
	mongoTaskStorage,
	taskMysqlRepository
);
const userSwitchRepository = new UserSwitchRepository(
	jsonUserStorage,
	mongoUserStorage,
	userMysqlRepository
);

const uuidService = new UuidService();
const bcryptService = new BcryptService();

const userService = new UserService(bcryptService, uuidService, userSwitchRepository);
const taskService = new TaskService(taskSwitchRepository, uuidService);
const userController = new UserController(userService);
const taskController = new TaskController(taskService);

const inquirer = new Inquirer(userController, taskController);

inquirer.start();
