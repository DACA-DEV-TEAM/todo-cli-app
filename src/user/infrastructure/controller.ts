import JsonTaskStorage from "../domain/repositories/JsonTaskStorage";
import Service from "./service";

const path = "";
const jsonTaskStorage = new JsonTaskStorage(path);
const service = new Service(jsonTaskStorage);

const createTask = async () => {
	await service.createTask(" ");
	throw new Error("");
};
