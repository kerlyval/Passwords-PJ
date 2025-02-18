import { Router } from 'express';
import { UserRouter } from './user/router';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/api/v1/user', UserRouter.routes);

		return router;
	}
}
