import { Pin } from '../../data';
import { CustomError } from '../../domain';
import { PinDTO } from '../../domain/dtos/pin/pin.dto';

export class PinService {
	async findAllPins() {
		try {
			return await Pin.find();
		} catch (error) {
			throw CustomError.internalServer('Error getting the Pins');
		}
	}

	async findOnePin(id: string) {
		try {
			const pin = await Pin.findOne({
				where: {
					id,
				},
			});

			if (!pin) throw CustomError.notFound('Pin not fount');

			return pin;
		} catch (error) {
			throw CustomError.internalServer('Error getting the Pin');
		}
	}

	async createPin(pinData: PinDTO, id: string) {
		const pin = new Pin();

		pin.code = pinData.code;

		try {
			return await pin.save();
		} catch (error) {
			console.log(error);
			throw CustomError.internalServer('Error creating Pin');
		}
	}

	async updatePin(id: string, pinData: PinDTO) {
		const pin = await this.findOnePin(id);

		pin.code = pinData.code;

		try {
			return await pin.save();
		} catch (error) {
			console.log(error);
			throw CustomError.internalServer('Error updating  pin');
		}
	}
}
