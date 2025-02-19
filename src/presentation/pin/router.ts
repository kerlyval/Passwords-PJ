import { Router } from 'express';
import { PinService } from '../services/pin.service';
import { PinController } from './controller';

export class PinRouter {
	static get routes(): Router {
		const router = Router();

		const pinService = new PinService();
		const pinController = new PinController(pinService);

		router.post('/create', pinController.createPin);

		router.get('/', pinController.findAllPins);
		router.get('/:id', pinController.findOnePin);
		router.patch('/:id', pinController.updatePin);

		return router;
	}
}
