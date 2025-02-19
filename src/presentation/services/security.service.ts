import { SecurityBox, Status } from '../../data';
import { CustomError } from '../../domain';
import { CreateSecurityBoxDTO } from '../../domain/dtos/security/create.security.dto';
import { UserService } from './user.service';

export class SecurityService {
	constructor(public readonly userService: UserService) {}

	async findAllSecurity() {
		try {
			return await SecurityBox.find();
		} catch (error) {
			throw CustomError.internalServer('Error getting the Pins');
		}
	}

	async findOneSecurity(id: string) {
		try {
			const security = await SecurityBox.findOne({
				where: {
					id,
					status: Status.ACTIVE,
				},
				relations: ['user'],
				select: [], //completar esta info
			});

			if (!security) throw CustomError.notFound('Pin not fount');

			return security;
		} catch (error) {
			throw CustomError.internalServer('Error getting the Pin');
		}
	}

	async createSecurity(securityData: CreateSecurityBoxDTO) {
		const security = new SecurityBox();

		// const user = await this.userService.findOneUser(securityData.userId);
		//Complete data security.name and so on

		try {
			return await security.save();
		} catch (error) {
			console.log(error);
			throw CustomError.internalServer('Error creating Pin');
		}
	}

	async updateSecurity(id: string, securityData: CreateSecurityBoxDTO) {
		const security = await this.findOneSecurity(id);

		// const user = await this.userService.findOneUser(securityData.userId);

		try {
			return await security.save();
		} catch (error) {
			console.log(error);
			throw CustomError.internalServer('Error updating  pin');
		}
	}

	async deleteSecurity(id: string) {
		const security = await this.findOneSecurity(id);

		security.status = Status.DELETED;

		try {
			return await security.save();
		} catch (error: any) {
			console.log(error);
			throw CustomError.internalServer('Error deleting security');
		}
	}
}
