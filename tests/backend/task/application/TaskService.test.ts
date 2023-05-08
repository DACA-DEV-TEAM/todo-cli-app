import { UuidService } from "../../../../src/backend/shared/application/UuidService";
import { TaskService } from "../../../../src/backend/task/application/TaskService";
import { Task } from "../../../../src/backend/task/domain/Task";
import { TaskSwitchRepository } from "../../../../src/backend/task/infrastructure/TaskSwitchRepository";

jest.mock("../../../../src/backend/shared/application/UuidService");
jest.mock("../../../../src/backend/task/domain/TaskRepository");

describe("TaskService", () => {
	let taskService: TaskService;

	beforeEach(() => {
		taskService = new TaskService(
			{
				createTask: jest.fn().mockResolvedValue(Task),
				updateTask: jest.fn().mockResolvedValue(true),
				deleteTask: jest.fn().mockResolvedValue(true),
				get: jest.fn().mockResolvedValue(Task),
				getUserTasks: jest.fn().mockResolvedValue(Task),
				switchRepository: jest.fn(),
				getTaskRepository: jest.fn(),
			} as unknown as TaskSwitchRepository,
			new UuidService()
		);
	});

	describe("updateTask", () => {
		it("should update a task", async () => {
			const taskId = "test-task-id";
			const updatedTaskData = { description: "Test task" };
			const result = await taskService.updateTask(taskId, updatedTaskData);
			expect(result).toBe(true);
		});
	});

	describe("deleteTask", () => {
		it("should delete a task", async () => {
			const taskId = "test-task-id";
			const result = await taskService.deleteTask(taskId);
			expect(result).toBe(true);
		});
	});

	describe("userTasks", () => {
		it("should list all tasks from a user", async () => {
			const userId = "test-user-id";
			const result = await taskService.userTasks(userId);
			expect(result).toBe(Task);
		});
	});
});
