import { CustomError } from '../../domain';
import { UserService } from '../services/user.service';

export class UserController {
	constructor(private readonly userService: UserService) {}

	private handleEror = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message });
		}
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong! 💀🧨' });
	};
}
