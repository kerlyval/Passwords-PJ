import { Router } from 'express';
import { UserController } from './controller';

export class UserRouter {
	static get routes(): Router {
		const router = Router();

		router.get('/api/v1/user', UserController);

		return router;
	}
}
