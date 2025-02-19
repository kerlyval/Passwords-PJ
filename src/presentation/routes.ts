import { Router } from 'express';
import { UserRouter } from './user/router';
import { CredentialStorageRouter } from './credential_Storage/router';
import { PinRouter } from './pin/router';
import { SecurityBoxRouter } from './security_box/router';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/api/v1/user', UserRouter.routes);

		router.use('/api/v1/credential', CredentialStorageRouter.routes);
		router.use('/api/v1/pin', PinRouter.routes);
		router.use('/api/v1/security', SecurityBoxRouter.routes);

		return router;
	}
}
