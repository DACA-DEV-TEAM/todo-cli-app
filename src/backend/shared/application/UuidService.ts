import { v4 as uuidv4 } from "uuid";

export class UuidService {
	UUIDgenerator(): string {
		const id = uuidv4();

		return id;
	}
}
