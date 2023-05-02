import { UuidService } from "../../../../src/backend/shared/application/UuidService";
import { BcryptService } from "../../../../src/backend/user/application/BcryptService";
import { UserService } from "../../../../src/backend/user/application/UserService";
import User from "../../../../src/backend/user/domain/User";
import UserRepository from "../../../../src/backend/user/domain/UserRepository";
import { UserController } from "../../../../src/backend/user/infrastructure/UserController";

jest.mock("../../../../src/backend/user/application/UserService", () => {
	return {
		UserService: jest.fn().mockImplementation(() => ({
			createUser: jest.fn(),
			authenticate: jest.fn(),
		})),
	};
});

const mockUserRepository = {} as UserRepository;
const mockBcryptService = {} as BcryptService;
const mockUuidService = {} as UuidService;

const mockUserService = new UserService(
	mockUserRepository,
	mockBcryptService,
	mockUuidService
) as jest.Mocked<UserService>;

describe("UserController", () => {
	let userController: UserController;

	beforeEach(() => {
		jest.clearAllMocks();
		userController = new UserController(mockUserService);
	});

	it("should create a user", async () => {
		const userName = "testuser";
		const password = "testpassword";

		const createdUser: User = {
			uuid: "12345",
			userName,
			password: "hashedpassword",
		};

		mockUserService.createUser.mockResolvedValueOnce(createdUser);

		const result = await userController.createUser(userName, password);

		expect(result).toBeTruthy();
		const { createUser } = mockUserService;
		expect(createUser).toHaveBeenCalledWith(userName, password);
	});

	it("should authenticate a user", async () => {
		const userName = "testuser";
		const password = "testpassword";
		const userUuid = "12345";

		mockUserService.authenticate.mockResolvedValueOnce(userUuid);

		const result = await userController.authenticate(userName, password);

		expect(result).toEqual(userUuid);
		expect(mockUserService.authenticate).toHaveBeenCalledWith(userName, password);
	});
});
