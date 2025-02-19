import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { SecurityService } from '../services/security.service';
import { CreateSecurityBoxDTO } from '../../domain/dtos/security/create.security.dto';

export class SecurityBoxController {
	constructor(private readonly securityService: SecurityService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message });
		}
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong! 💀🧨' });
	};

	createSecurityBox = (req: Request, res: Response) => {
		const [error, createSecurityBox] = CreateSecurityBoxDTO.create(req.body);

		if (error) return res.status(422).json({ errors: error });

		this.securityService
			.createSecurity(createSecurityBox!) // confía ! hay data
			.then((data: unknown) => {
				return res.status(201).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	findAllSecurityBox = (req: Request, res: Response) => {
		this.securityService
			.findAllSecurity()
			.then((data: unknown) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};
	//Dont forget to make the favorite

	findOneSecurity = (req: Request, res: Response) => {
		const { id } = req.params;

		this.securityService
			.findOneSecurity(id)
			.then((data: any) => {
				res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	updateSecurity = (req: Request, res: Response) => {
		const { id } = req.params;

		this.securityService
			.updateSecurity(id, req.body)
			.then((data: any) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	deleteSecurity = (req: Request, res: Response) => {
		const { id } = req.params;

		this.securityService
			.deleteSecurity(id)
			.then((data: any) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};
}
