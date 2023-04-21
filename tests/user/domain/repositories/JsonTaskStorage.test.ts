import { Task, TaskStatus } from "../../../../src/user/domain/entities/Task";
import JsonTaskStorage from "../../../../src/user/domain/repositories/JsonTaskStorage";
import { readJsonFile, writeJsonFile } from "../../../../src/user/util/JsonFileUtil";

jest.mock("../../../../src/user/util/JsonFileUtil");

const jsonFilePath = "db.json";
const task1: Task = new Task("Task 1");
const task2: Task = new Task("Task 2");
const task3: Task = new Task("Task 3");
let jsonTaskStorage: JsonTaskStorage;

describe("JsonTaskStorage", () => {
	beforeEach(() => {
		jsonTaskStorage = new JsonTaskStorage(jsonFilePath);
		jest.resetAllMocks();
	});

	it("createTask should create a new task in the JSON file", async () => {
		// Mockear la función de lectura de archivo para que devuelva un array vacío
		(readJsonFile as jest.Mock).mockResolvedValue([]);

		// Mockear la función de escritura de archivo para comprobar los datos escritos
		(writeJsonFile as jest.Mock).mockImplementation((filePath: string, data: Task[]) => {
			expect(filePath).toBe(jsonFilePath); // Comprobar que el archivo es el correcto
			expect(data).toStrictEqual([task1]); // Comprobar que los datos escritos son los esperados

			return Promise.resolve();
		});

		await jsonTaskStorage.createTask(task1);

		expect(readJsonFile).toHaveBeenCalledWith(jsonFilePath);
		expect(writeJsonFile).toHaveBeenCalledWith(jsonFilePath, [task1]);
	});

	it("get returns a single task from the db", async () => {
		//Arrange
		const mockReadJsonFile = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
		mockReadJsonFile.mockResolvedValue([task1]);
		//Act
		const result = await jsonTaskStorage.get(task1.id);
		//Assert
		expect(result).toBe(task1);
		expect(mockReadJsonFile).toHaveBeenCalledTimes(1);
	});

	it("listTasks returns all tasks from the db", async () => {
		//Arrange
		const tasks = [task1, task2, task3];
		const mockReadJsonFile = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
		mockReadJsonFile.mockResolvedValue(tasks);
		//Act
		const taskList = await jsonTaskStorage.listTasks();
		//Assert
		expect(taskList).toBe(tasks);
		expect(mockReadJsonFile).toHaveBeenCalledTimes(1);
	});
});

describe("updateTask", () => {
	const taskList = [task1, task2, task3];
	const updatedTasklist = [task1, task2, { ...task3, status: TaskStatus.COMPLETED }];
	const mockwriteJsonFile = writeJsonFile as jest.MockedFunction<typeof writeJsonFile>;
	const mockReadJsonFile = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
	beforeEach(() => {
		jest.clearAllMocks();
		mockReadJsonFile.mockResolvedValue(taskList);
		mockwriteJsonFile.mockImplementation((filePath: string, data: Task[]) => {
			expect(filePath).toBe(jsonFilePath); // Comprobar que el archivo es el correcto
			expect(data).toStrictEqual(updatedTasklist); // Comprobar que los datos escritos son los esperados

			return Promise.resolve();
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("updateTask to update the task", async () => {
		//Arrange
		const id = task3.id;
		const updatedTaskData = { status: TaskStatus.COMPLETED };
		//Act
		await jsonTaskStorage.updateTask(id, updatedTaskData);
		//Assert
		expect(mockReadJsonFile).toHaveBeenCalledTimes(1);
		expect(mockwriteJsonFile).toHaveBeenCalledTimes(1);
		expect(mockwriteJsonFile).toHaveBeenCalledWith(jsonFilePath, updatedTasklist);
		expect(mockReadJsonFile).toHaveBeenCalledWith(jsonFilePath);
	});

	it("updateTask to resolves true", async () => {
		//Arrange
		const id = task3.id;
		const updatedTaskData = { status: TaskStatus.COMPLETED };
		//Act
		const result = jsonTaskStorage.updateTask(id, updatedTaskData);
		//Assert
		await expect(result).resolves.toBe(true);
	});

	it('updateTask to rejects "Not found"', async () => {
		//Arrange
		const id = "notValid";
		const updatedTaskData = { status: TaskStatus.COMPLETED };
		//Act
		const result = jsonTaskStorage.updateTask(id, updatedTaskData);
		//Assert
		await expect(result).rejects.toThrow("Not found");
	});
});

describe("deleteTask", () => {
	const mockReadJsonFile = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
	const mockwriteJsonFile = writeJsonFile as jest.MockedFunction<typeof writeJsonFile>;
	const taskDb = [task1, task2, task3];

	beforeEach(() => {
		jsonTaskStorage = new JsonTaskStorage(jsonFilePath);
		mockReadJsonFile.mockResolvedValue(taskDb);
		mockwriteJsonFile.mockImplementation((filePath: string, data: Task[]) => {
			expect(filePath).toBe(jsonFilePath); // Comprobar que el archivo es el correcto
			expect(data).toStrictEqual([task2, task3]); // Comprobar que los datos escritos son los esperados

			return Promise.resolve();
		});
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("deleteTask delete a single task of the given passed id", async () => {
		//Arrange
		const id = taskDb[0].id;
		//Act
		const result = jsonTaskStorage.deleteTask(id);
		//Assert
		await expect(result).resolves.toBe(true);
	});

	it("deleteTask rejects throws error", async () => {
		//Arrange
		const id = "4";
		//Act
		const result = jsonTaskStorage.deleteTask(id);
		//Assert
		await expect(result).rejects.toThrow("Task not found");
	});
});
