import { Request, Response } from 'express';
import { CredentialStorageService } from '../services/credentialStorage.service';
import { CustomError } from '../../domain';
import { CreateCredentialStorageDTO } from '../../domain/dtos/credential-Storage/create.credential.dto';
import { UpdateCredentialStorageDTO } from '../../domain/dtos/credential-Storage/update.credential.dto';

export class CredentialStorageController {
	constructor(
		private readonly credentialStorageService: CredentialStorageService,
	) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message });
		}
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong! 🧨' });
	};

	createCredential = async (req: Request, res: Response) => {
		const [error, createCredentialDto] = CreateCredentialStorageDTO.create(
			req.body,
		);

		if (error) return res.status(422).json({ message: error });

		this.credentialStorageService
			.createCredential(createCredentialDto!) //el ! nos dice CONFIA jajaj
			.then((data) => {
				return res.status(201).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	findAllCredentials = async (req: Request, res: Response) => {
		this.credentialStorageService
			.findAllCredential()
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	findOneCredential = async (req: Request, res: Response) => {
		const { id } = req.params;

		this.credentialStorageService
			.findOneCredential(id)
			.then((data: any) => {
				res.status(200).json(data);
			})
			.catch((error: any) => this.handleError(error, res));
	};

	updateCredential = async (req: Request, res: Response) => {
		const { id } = req.params;

		const [error, updateCredentialDto] = UpdateCredentialStorageDTO.update(
			req.body,
		);

		if (error) return res.status(422).json({ message: error });

		this.credentialStorageService
			.updateCredential(id, updateCredentialDto!) // ! confia xD
			.then((data: any) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	deleteCredential = async (req: Request, res: Response) => {
		const { id } = req.params;

		this.credentialStorageService
			.deleteCredential(id)
			.then(() => {
				return res.status(204).json(null);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};
}
