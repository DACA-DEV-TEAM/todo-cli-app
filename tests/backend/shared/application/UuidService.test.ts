import { v4 as uuidv4 } from "uuid";

import { UuidService } from "../../../../src/backend/shared/application/UuidService";

jest.mock("uuid");

describe("UuidService", () => {
	let uuidService: UuidService;

	beforeEach(() => {
		uuidService = new UuidService();
	});

	it("should generate a UUID", () => {
		const uuid = "1234";
		(uuidv4 as jest.Mock).mockReturnValue(uuid);

		const id = uuidService.UUIDgenerator();

		expect(id).toEqual(uuid);
	});

	it("should generate a different UUID each time", () => {
		const uuid = "1234";
		(uuidv4 as jest.Mock).mockReturnValueOnce(uuid);
		(uuidv4 as jest.Mock).mockReturnValueOnce("5678");

		const id1 = uuidService.UUIDgenerator();
		const id2 = uuidService.UUIDgenerator();

		expect(id1).toEqual(uuid);
		expect(id2).toEqual("5678");
	});
});
