import { Router } from 'express';
import { CredentialStorageController } from './controller';

export class CredentialStorageRouter {
	static get routes(): Router {
		const router = Router();

		// const credentialStorageService = new CredentialStorageService();
		// const credentialStorageController = new CredentialStorageController();

		// router.get('/', (req, res) => {
		// 	return res.status(200).json({
		// 		message: 'Enre a la ruta',
		// 	});
		// });

		return router;
	}
}
