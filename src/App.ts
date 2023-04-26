import JsonTaskRepository from "./backend/task/infrastructure/JsonTaskRepository";
import JsonUserRepository from "./backend/user/infrastructure/JsonUserRepository";
import Inquirer from "./cli/inquirer.start";
import Controller from "./user/infrastructure/controller";
import Service from "./user/infrastructure/service";
//TODO implementar bien los ambos servicios y controladores
const taskPath = "./src/jsonDB/db.json";
const userPath = "./src/jsonDB/userDb.json";
const jsonTaskStorage = new JsonTaskRepository(taskPath);
const jsonUserStorage = new JsonUserRepository(userPath);

const service = new Service(jsonTaskStorage, jsonUserStorage);
const controller = new Controller(service);
const inquirer = new Inquirer(controller);

inquirer.start();
