import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { PinService } from '../services/pin.service';
import { PinDTO } from '../../domain/dtos/pin/pin.dto';

export class PinController {
	constructor(private readonly pinService: PinService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message });
		}
		console.log(error);
		return res.status(500).json({ message: 'Something went wrong! 🤨💀🧨' });
	};

	createPin = (req: Request, res: Response) => {
		const [error, pinDTO] = PinDTO.create(req.body);

		if (error) return res.status(422).json({ errors: error });

		this.pinService
			.createPin(pinDTO!) // confía ! hay data
			.then((data: unknown) => {
				return res.status(201).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	findAllPins = (req: Request, res: Response) => {
		this.pinService
			.findAllPins()
			.then((data: unknown) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	findOnePin = (req: Request, res: Response) => {
		const { id } = req.params;

		this.pinService
			.findOnePin(id)
			.then((data: any) => {
				res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	updatePin = (req: Request, res: Response) => {
		const { id } = req.params;

		const [error, pinDTO] = PinDTO.create(req.body);

		if (error) return res.status(422).json({ message: error });

		this.pinService
			.updatePin(id, pinDTO!) // ! confia xD
			.then((data: any) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};
}
