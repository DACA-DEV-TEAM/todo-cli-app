import { v4 as uuidv4 } from "uuid";

class User {
	readonly _id: string;
	constructor(public name: string, public password: string) {
		this._id = uuidv4();
	}
}

export default User;
