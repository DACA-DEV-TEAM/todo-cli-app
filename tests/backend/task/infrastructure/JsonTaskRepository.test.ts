import { UuidService } from "../../../../src/backend/shared/application/UuidService";
import {
	readJsonFile,
	writeJsonFile,
} from "../../../../src/backend/shared/infrastructure/JsonFileUtil";
import { Task } from "../../../../src/backend/task/domain/Task";
import { TaskStatus } from "../../../../src/backend/task/domain/TaskStatus";
import JsonTaskRepository from "../../../../src/backend/task/infrastructure/JsonTaskRepository";

jest.mock("../../../../src/backend/shared/infrastructure/JsonFileUtil");

const jsonFilePath = "db.json";
const userId = new UuidService().UUIDgenerator();
const task1 = new Task(new UuidService().UUIDgenerator(), "Task 1", userId);
const task2 = new Task(new UuidService().UUIDgenerator(), "Task 1", userId);
const task3 = new Task(new UuidService().UUIDgenerator(), "Task 1", userId);
let jsonTaskStorage: JsonTaskRepository;

describe("JsonTaskRepository", () => {
	beforeEach(() => {
		jsonTaskStorage = new JsonTaskRepository(jsonFilePath);
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	it("createTask should create a new task in the JSON file", async () => {
		(readJsonFile as jest.Mock).mockResolvedValue([]);

		(writeJsonFile as jest.Mock).mockImplementation((filePath: string, data: Task[]) => {
			expect(filePath).toBe(jsonFilePath);
			expect(data).toStrictEqual([task1]);

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
		const result = await jsonTaskStorage.get(task1.uuid);
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
		const taskList = await jsonTaskStorage.getUserTasks(userId);
		//Assert
		expect(taskList).toEqual(tasks);
		expect(mockReadJsonFile).toHaveBeenCalledTimes(1);
	});
});

describe("updateTask", () => {
	const taskList = [task1, task2, task3];
	const updatedEndTime = new Date();
	const updatedTask = { ...task3, status: TaskStatus.COMPLETED, endTime: updatedEndTime };
	const updatedTasklist = [task1, task2, updatedTask];
	const mockwriteJsonFile = writeJsonFile as jest.MockedFunction<
		typeof writeJsonFile
	> as jest.MockedFunction<(jsonFilePath: string, dataJson: Task[]) => Promise<void>>;
	const mockReadJsonFile = readJsonFile as jest.MockedFunction<
		typeof readJsonFile
	> as jest.MockedFunction<(jsonFilePath: string) => Promise<Task[]>>;
	let dateSpy: jest.SpyInstance;
	beforeEach(() => {
		jest.clearAllMocks();
		dateSpy = jest
			.spyOn(globalThis, "Date")
			.mockImplementation(() => updatedEndTime as unknown as string);
		mockReadJsonFile.mockResolvedValue(taskList);
		mockwriteJsonFile.mockImplementation((filePath: string, data: Task[]) => {
			expect(filePath).toBe(jsonFilePath);
			expect(data).toStrictEqual(updatedTasklist);

			return Promise.resolve();
			dateSpy = jest
				.spyOn(globalThis, "Date")
				.mockImplementation(() => updatedEndTime as unknown as string);
		});
	});

	afterEach(() => {
		dateSpy.mockRestore();
		jest.clearAllMocks();
	});

	it("updateTask to update the task", async () => {
		//Arrange
		const id = task3.uuid;
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
		const id = task3.uuid;
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
	const mockwriteJsonFile = writeJsonFile as jest.MockedFunction<
		typeof writeJsonFile
	> as jest.MockedFunction<(jsonFilePath: string, dataJson: Task[]) => Promise<void>>;
	const mockReadJsonFile = readJsonFile as jest.MockedFunction<
		typeof readJsonFile
	> as jest.MockedFunction<(jsonFilePath: string) => Promise<Task[]>>;

	const taskDb = [task1, task2, task3];

	beforeEach(() => {
		jsonTaskStorage = new JsonTaskRepository(jsonFilePath);
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
		const id = taskDb[0].uuid;
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
