import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/user/login.user.dto';
import { UserService } from '../services/user.service';
import { RegisterUserDTO } from '../../domain/dtos/user/register.user.dto';

export class UserController {
	constructor(private readonly userService: UserService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message });
		}
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong! 💀🧨' });
	};

	login = async (req: Request, res: Response) => {
		const [error, loginUserDto] = LoginUserDto.create(req.body);

		if (error) return res.status(422).json({ message: error });

		this.userService
			.login(loginUserDto!) // ! confia
			.then((data) => res.status(200).json(data))
			.catch((error) => this.handleError(error, res));
	};

	register = async (req: Request, res: Response) => {
		const [error, registerUserDto] = RegisterUserDTO.create(req.body);

		if (error) return res.status(422).json({ message: error });

		this.userService
			.register(registerUserDto!) //le decimos que confie !
			.then((data) => res.status(200).json(data))
			.catch((error: any) => this.handleError(error, res));
	};

	findOneUser = (req: Request, res: Response) => {
		this.userService
			.findOneUser(req.params.id)
			.then((data) => res.status(200).json(data))
			.catch((error) => this.handleError(error, res));
	};

	// createUser = async (req: Request, res: Response) => {
	// 	this.userService
	// 		.create(req.body)
	// 		.then((data) => res.status(200).json(data))
	// 		.catch((error: any) => this.handleError(error, res));
	// };
}
