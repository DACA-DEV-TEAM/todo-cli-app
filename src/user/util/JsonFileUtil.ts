import { Task } from "../domain/entities/Task";

import { readFile, writeFile } from "fs/promises";

const readJsonFile = async (jsonFilePath: string): Promise<Task[]> => {
  try {
    const data = await readFile(jsonFilePath);
    return JSON.parse(data.toString());
  } catch (error) {
    if (error === "ENOENT") {
      return [];
    }
    throw error;
  }
};
const writeJsonFile = async (jsonFilePath: string, tasks: Task[]): Promise<void> => {
    const data = JSON.stringify(tasks, null, 2);
    await writeFile(jsonFilePath, data);
  }
export {readJsonFile, writeJsonFile}
