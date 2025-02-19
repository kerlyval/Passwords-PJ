import { Router } from 'express';
import { CredentialStorageController } from './controller';
import { CredentialStorageService } from '../services/credentialStorage.service';

export class CredentialStorageRouter {
	static get routes(): Router {
		const router = Router();

		const credentialStorageService = new CredentialStorageService();
		const credentialStorageController = new CredentialStorageController(
			credentialStorageService,
		);

		router.post('/', credentialStorageController.createCredential);

		return router;
	}
}
