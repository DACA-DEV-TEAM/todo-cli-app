import bcrypt from "bcrypt";

export class BcryptService {
	async encrypt(password: string): Promise<string> {
		return await bcrypt.hash(password, 10);
	}

	async decrypt(password: string, userPassword: string): Promise<boolean> {
		return await bcrypt.compare(password, userPassword);
	}
}
