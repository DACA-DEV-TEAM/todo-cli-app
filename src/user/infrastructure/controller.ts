import JsonTaskStorage from "../domain/repositories/JsonTaskStorage";
import { readImput } from "./inquirer/inquirerMenu";
import Service from "./service";
//TODO meter path en una variable de entorno
const path = "./src/jsonDb/db.json";
const jsonTaskStorage = new JsonTaskStorage(path);
const service = new Service(jsonTaskStorage);

const createTask = async (): Promise<void> => {
	const desc = await readImput("description");
	await service.createTask(desc);
};
//TODO si se agrega colors, poner a varios colores para los estados
const listTasks = async (): Promise<void> => {
	(await service.listTasks()).forEach((task, i) => {
		const idx = `${i + 1}`;
		const { description, status } = task;

		console.log(`${idx} ${description} :: ${status}`);
	});
};
const updateTask = async (): Promise<void> => {
	const id = await showTasks(service.listTasks());
	const task = await service.searchTask(id);
	const desc = await readImput("description");
	const status = await readImput("status");
	await service.updateTask()

	//throw new Error("");
};
const searchTask = async (): Promise<void> => {
	throw new Error("");
};
const deleteTask = async (): Promise<void> => {
	throw new Error("");
};
export { createTask, deleteTask, listTasks, searchTask, updateTask };
