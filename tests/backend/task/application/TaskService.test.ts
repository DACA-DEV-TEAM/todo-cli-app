/* eslint-disable @typescript-eslint/unbound-method */
import { UuidService } from "../../../../src/backend/shared/application/UuidService";
import { TaskService } from "../../../../src/backend/task/application/TaskService";
import { Task } from "../../../../src/backend/task/domain/Task";
import JsonTaskRepository from "../../../../src/backend/task/infrastructure/json/JsonTaskRepository";
import { MongoTaskRepository } from "../../../../src/backend/task/infrastructure/mongo/MongoTaskRepository";
import { TaskMysqlRepository } from "../../../../src/backend/task/infrastructure/mysql/TaskMysqlRepository";
import { TaskSwitchRepository } from "../../../../src/backend/task/infrastructure/TaskSwitchRepository";

jest.mock("../../../../src/backend/task/infrastructure/TaskSwitchRepository");

describe("TaskService", () => {
	let taskSwitchRepository: TaskSwitchRepository;
	let uuidService: UuidService;
	let taskService: TaskService;

	beforeEach(() => {
		taskSwitchRepository = new TaskSwitchRepository(
			{} as JsonTaskRepository,
			{} as MongoTaskRepository,
			{} as TaskMysqlRepository
		);
		uuidService = new UuidService();
		taskService = new TaskService(taskSwitchRepository, uuidService);
	});

	test("should create a new task", async () => {
		const desc = "Sample task";
		const userId = "user-1";
		const uuid = "uuid-1";
		const task = new Task(uuid, desc, userId);
		jest.spyOn(uuidService, "UUIDgenerator").mockReturnValue(uuid);
		jest.spyOn(taskSwitchRepository, "createTask").mockReturnValue(task);

		await taskService.createTask(desc, userId);

		expect(taskSwitchRepository.createTask).toHaveBeenCalledWith(task);
	});

	test("should get user tasks", async () => {
		const userId = "user-1";
		const tasks: Task[] = [
			new Task("uuid-1", "Sample task 1", userId),
			new Task("uuid-2", "Sample task 2", userId),
		];
		jest.spyOn(taskSwitchRepository, "getUserTasks").mockResolvedValue(tasks);

		const result = await taskService.userTasks(userId);

		expect(result).toEqual(tasks);
		expect(taskSwitchRepository.getUserTasks).toHaveBeenCalledWith(userId);
	});

	test("should update a task", async () => {
		const taskId = "task-1";
		const partialTask = {
			status: "Completed",
			endTime: new Date(),
		};

		jest.spyOn(taskSwitchRepository, "updateTask").mockResolvedValue(true);

		const result = await taskService.updateTask(taskId, partialTask);

		expect(result).toBe(true);
		expect(taskSwitchRepository.updateTask).toHaveBeenCalledWith(taskId, partialTask);
	});

	test("should search a task", async () => {
		const taskId = "task-1";
		const task = new Task(taskId, "Sample task", "user-1");
		jest.spyOn(taskSwitchRepository, "get").mockResolvedValue(task);

		const result = await taskService.searchTask(taskId);

		expect(result).toMatchObject({
			description: task.description,
			status: task.status,
			startTime: task.startTime.toLocaleString(),
			endTime: task.endTime ? task.endTime.toLocaleString() : null,
		});
		expect(taskSwitchRepository.get).toHaveBeenCalledWith(taskId);
	});

	test("should delete a task", async () => {
		const taskId = "task-1";
		jest.spyOn(taskSwitchRepository, "deleteTask").mockResolvedValue(true);

		const result = await taskService.deleteTask(taskId);

		expect(result).toBe(true);
		expect(taskSwitchRepository.deleteTask).toHaveBeenCalledWith(taskId);
	});

	test("should choose a repository", async () => {
		const db = "JSON";
		jest.spyOn(taskSwitchRepository, "switchRepository").mockResolvedValue();

		await taskService.chooseRepository(db);

		expect(taskSwitchRepository.switchRepository).toHaveBeenCalledWith(db);
	});
});
