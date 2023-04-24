import Service from "./service";
//TODO meter path en una variable de entorno

class Controller {
	constructor(private readonly service: Service) {}

	async createTask(description: string): Promise<boolean> {
		await this.service.createTask(description);

		return true;
	}
}
export default Controller; /* 
const createTask = async (): Promise<void> => {
	const desc = await readImput("description");
	await service.createTask(desc);
};
//TODO si se agrega colors, poner a varios colores para los estados
const listTasks = async (): Promise<void> => {
	const taskList = await service.listTasks();
	taskList.forEach((task, i) => {
		const idx = `${i + 1}`;
		const { description, status } = task;
		console.log(`${idx} ${description} :: ${status}`);
	});
	if (taskList.length === 0) {
		throw new Error("\n There are no task");
	}
};
interface Partial {
	id?: string;
	description?: string;
	status?: string;
}
const updateTask = async (): Promise<void> => {
	const taskList = await service.listTasks();
	if (taskList.length === 0) {
		throw new Error("\n There are no task");
	}
	const partial: Partial = {};

	const idx = await showTasks(taskList);
	partial.id = idx;
	const confirmDesc = await confirmOperation("Do you want to update description?");
	if (confirmDesc) {
		partial.description = await readImput("Add a new description:");
	}
	const confirmStatus = await confirmOperation("Do you want to update status?");

	if (confirmStatus) {
		partial.status = await showStatusList();
	}
	await service.updateTask(idx, partial);
	!confirmDesc && !confirmStatus
		? console.log("No changes have been made")
		: console.log("Task updated succesfully");
};
const searchTask = async (): Promise<void> => {
	const taskList = await service.listTasks();
	if (taskList.length === 0) {
		throw new Error("There is not tasks");
	}
	const idx = await showTasks(taskList);
	const task = await service.searchTask(idx);
	console.log(`
	Description: ${task.description},
	Status: ${task.status},
	Started at: ${task.startTime.toDateString()},
	Ended at: ${
		task.status !== TaskStatus.COMPLETED ? "Task still on going" : task.endTime?.toDateString()
	}
	`);
};
const deleteTask = async (): Promise<void> => {
	const taskList = await service.listTasks();
	if (taskList.length === 0) {
		throw new Error("\n There are no tasks");
	}
	const idx = await showTasks(taskList);
	const task = await service.searchTask(idx);
	const confirmDelete = await confirmOperation(`Do you want to delete? -- ${task.description}`);
	if (confirmDelete) {
		await service.deleteTask(idx);
		console.log("\n Task deleted successfully");
	}
};
export { createTask, deleteTask, listTasks, searchTask, updateTask }; */
