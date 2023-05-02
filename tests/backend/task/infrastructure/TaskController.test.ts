import { UuidService } from "../../../../src/backend/shared/application/UuidService";
import { TaskService } from "../../../../src/backend/task/application/TaskService";
import TaskRepository from "../../../../src/backend/task/domain/TaskRepository";
import { TaskController } from "../../../../src/backend/task/infrastructure/TaskController";

jest.mock("../../../../src/backend/shared/application/UuidService");
jest.mock("../../../../src/backend/task/domain/TaskRepository");
jest.mock("../../../../src/backend/task/application/TaskService");

describe("TaskController", () => {
	let taskService: TaskService;
	let taskController: TaskController;

	beforeEach(() => {
		taskService = new TaskService({} as TaskRepository, {} as UuidService);
		taskController = new TaskController(taskService);
		taskService.updateTask = jest.fn().mockReturnValue(true);
		taskService.deleteTask = jest.fn().mockReturnValue(true);
		taskService.searchTask = jest.fn().mockReturnValue(true);
		taskService.userTasks = jest.fn().mockReturnValue(true);
	});

	describe("createTask", () => {
		it("should create a new task", async () => {
			const description = "Test task";
			const userId = "test-user-id";

			const result = await taskController.createTask(description, userId);

			expect(result).toBe(true);
		});
	});

	describe("updateTask", () => {
		it("should update a task", async () => {
			const taskId = "test-task-id";
			const updatedTaskData = { description: "Test task" };
			const result = await taskController.updateTask(taskId, updatedTaskData);
			expect(result).toBe(true);
		});
	});

	describe("deleteTask", () => {
		it("should delete a task", async () => {
			const taskId = "test-task-id";
			const result = await taskController.deleteTask(taskId);
			expect(result).toBe(true);
		});
	});

	describe("searchTask", () => {
		it("should search a task", async () => {
			const taskId = "test-task-id";
			const result = await taskController.searchTask(taskId);
			expect(result).toBe(true);
		});
	});

	describe("listUserTasks", () => {
		it("should list user tasks", async () => {
			const userId = "test-user-id";
			const result = await taskController.listUserTasks(userId);
			expect(result).toBe(true);
		});
	});
});
