import Inquirer from "./cli/inquirer.start";
import JsonTaskStorage from "./user/domain/repositories/JsonTaskStorage";
import JsonUserStorage from "./user/domain/repositories/JsonUserStorage";
import Controller from "./user/infrastructure/controller";
import Service from "./user/infrastructure/service";

const taskPath = "./src/jsonDB/db.json";
const userPath = "./src/jsonDB/userDb.json";
const jsonTaskStorage = new JsonTaskStorage(taskPath);
const jsonUserStorage = new JsonUserStorage(userPath);

const service = new Service(jsonTaskStorage, jsonUserStorage);
const controller = new Controller(service);
const inquirer = new Inquirer(controller);

inquirer.start();
