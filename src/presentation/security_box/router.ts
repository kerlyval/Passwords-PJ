import { Router } from 'express';
import { PinService } from '../services/pin.service';
import { UserService } from '../services/user.service';
import { SecurityService } from '../services/security.service';
import { SecurityBoxController } from './controller';

export class SecurityBoxRouter {
	static get routes(): Router {
		const router = Router();

		const pinService = new PinService();
		const userServices = new UserService(pinService);
		const securityService = new SecurityService(userServices);
		const securityBoxController = new SecurityBoxController(securityService);

		router.post('/create', securityBoxController.createSecurityBox);

		router.get('/', securityBoxController.findAllSecurityBox);
		router.get('/:id', securityBoxController.findOneSecurity);
		router.patch('/:id', securityBoxController.updateSecurity);
		router.delete('/:id', securityBoxController.deleteSecurity);

		return router;
	}
}
