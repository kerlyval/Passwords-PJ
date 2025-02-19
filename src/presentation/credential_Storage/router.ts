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

		router.post('/create', credentialStorageController.createCredential);

		router.get('/', credentialStorageController.findAllCredentials);
		router.get('/:id', credentialStorageController.findOneCredential);
		router.patch('/:id', credentialStorageController.updateCredential);
		router.delete('/:id', credentialStorageController.deleteCredential);

		return router;
	}
}
