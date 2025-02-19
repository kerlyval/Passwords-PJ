import { Router } from 'express';
import { UserController } from './controller';
import { UserService } from '../services/user.service';
import { PinService } from '../services/pin.service';

export class UserRouter {
	static get routes(): Router {
		const router = Router();

		const pinService = new PinService();
		const userService = new UserService(pinService);
		const userController = new UserController(userService);

		router.post('/register', userController.register);
		router.post('/login', userController.login);

		router.get('/', userController.findAllUsers);
		router.get('/:id', userController.findOneUser);
		router.patch('/:id', userController.updateUser);
		router.delete('/:id', userController.deleteUser);

		return router;
	}
}
