import { Request, Response } from 'express';
import { CredentialStorageService } from '../services/credentialStorage.service';
import { CustomError } from '../../domain';

export class CredentialStorageController {
	constructor(
		private readonly credentialStorageService: CredentialStorageService,
	) {}

	// private handleEror = (error: unknown, res: Response) => {
	// 	if (error instanceof CustomError) {
	// 		return res.status(error.statusCode).json({ message: error.message });
	// 	}
	// 	console.log(error);
	// 	return res.status(500).json({ message: 'Something went wrong! 🧨' });
	// };

	// createCredential = (req: Request, res: Response) => {
	// 	const [error, createCredentialStorageDto] = CreateCredentialStorageDTO.create(req.body);

	// 	if (error) return res.status(422).json({ message: error });

	// 	this.credentialStorageService
	// 		.createCredential(createCredentialStorageDto!) //el ! nos dice CONFIA jajaj
	// 		.then((data: unknown) => {
	// 			return res.status(201).json(data);
	// 		})
	// 		.catch((error: unknown) => this.handleEror(error, res));
	// };

	createCredential = async (req: Request, res: Response) => {
		this.credentialStorageService
			.createCredential()
			.then((data) => {
				return res.status(201).json(data);
			})
			.catch((error) => {
				return res.status(500).json({
					message: 'creandopost',
					error,
				});
			});
	};
}
