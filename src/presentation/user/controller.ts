import { Request, Response } from 'express';
import { CustomError, UpdateUserDTO } from '../../domain';
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

	findOneUser = async (req: Request, res: Response) => {
		console.log('Received request for user ID', req.params.id);

		this.userService
			.findOneUser(req.params.id)
			.then((data) => {
				console.log('User fund:', data);
				res.status(200).json(data);
			})

			.catch((error) => {
				console.log('Error finding One User', error);
				this.handleError(error, res);
			});
	};

	findAllUsers = async (req: Request, res: Response) => {
		this.userService
			.findAllUsers()
			.then((data) => res.status(200).json(data))
			.catch((error) => this.handleError(error, res));
	};

	updateUser = (req: Request, res: Response) => {
		const { id } = req.params;

		const [error, updateProductDto] = UpdateUserDTO.create(req.body);

		if (error) return res.status(422).json({ message: error });

		this.userService
			.updateUser(id, updateProductDto!) // ! confia xD
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	deleteUser = async (req: Request, res: Response) => {
		const { id } = req.params;

		this.userService
			.deleteUser(id)
			.then(() => {
				return res.status(204).json(null);
			})
			.catch((error: any) => this.handleError(error, res));
	};
}
