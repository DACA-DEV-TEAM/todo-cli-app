import JsonTaskStorage from "../domain/repositories/JsonTaskStorage";
import { confirmOperation, readImput, showTasks } from "./inquirer/inquirerMenu";
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
interface Partial {
	id?: string;
	description?: string;
	status?: string;
}
const updateTask = async (): Promise<void> => {
	// Creo el objeto vacio
	const partial: Partial = {};
	// Muestro la lista para obtener el id
	const idx = await showTasks(await service.listTasks());
	// le agrego la key id
	partial.id = idx;
	const confirmDesc = await confirmOperation("Do you want to update description?");
	if (confirmDesc) {
		partial.description = await readImput("Add a new description:");
	} /*
	const confirmStatus = await confirmOperation("Do you want to update description?");

	const status = await readImput("status");
	*/
	console.log(partial);
	await service.updateTask(idx, partial);

	//throw new Error("");
};
const searchTask = async (): Promise<void> => {
	throw new Error("");
};
const deleteTask = async (): Promise<void> => {
	throw new Error("");
};
export { createTask, deleteTask, listTasks, searchTask, updateTask };
