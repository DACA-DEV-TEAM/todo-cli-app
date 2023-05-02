import { UuidService } from "./backend/shared/application/UuidService";
import { TaskService } from "./backend/task/application/TaskService";
import JsonTaskRepository from "./backend/task/infrastructure/JsonTaskRepository";
import { TaskController } from "./backend/task/infrastructure/TaskController";
import { BcryptService } from "./backend/user/application/BcryptService";
import { UserService } from "./backend/user/application/UserService";
import JsonUserRepository from "./backend/user/infrastructure/JsonUserRepository";
import { UserController } from "./backend/user/infrastructure/UserController";
import Inquirer from "./cli/inquirer.start";

const taskPath = "./src/backend/task/infrastructure/taskDb.json";
const userPath = "./src/backend/user/infrastructure/userDb.json";
const jsonTaskStorage = new JsonTaskRepository(taskPath);
const jsonUserStorage = new JsonUserRepository(userPath);

const uuidService = new UuidService();
const bcryptService = new BcryptService();
const userService = new UserService(jsonUserStorage, bcryptService, uuidService);
const taskService = new TaskService(jsonTaskStorage, uuidService);
const userController = new UserController(userService);
const taskController = new TaskController(taskService);
const inquirer = new Inquirer(userController, taskController, jsonTaskStorage, jsonUserStorage);

inquirer.start();
