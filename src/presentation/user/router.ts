import { Router } from 'express';
import { UserController } from './controller';
import { UserService } from '../services/user.service';

export class UserRouter {
	static get routes(): Router {
		const router = Router();

		const userService = new UserService();
		const userController = new UserController(userService);

		router.post('/register', userController.register);
		router.post('/login', userController.login);

		return router;
	}
}
