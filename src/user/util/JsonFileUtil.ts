import { readFile, writeFile } from "fs/promises";

import { Task } from "../domain/entities/Task";

const reviver = (_key: string, value: string): Date | string => {
	if (
		typeof value === "string" &&
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(value)
	) {
		return new Date(value);
	}

	return value;
};

const readJsonFile = async (jsonFilePath: string): Promise<Task[]> => {
	const data = await readFile(jsonFilePath, "utf8");
	const tasksJson: Task[] = JSON.parse(data, reviver);

	return tasksJson;
};

const writeJsonFile = async (jsonFilePath: string, tasks: Task[]): Promise<void> => {
	const data = JSON.stringify(tasks, null, 2);
	await writeFile(jsonFilePath, data);
};

export { readJsonFile, reviver, writeJsonFile };
