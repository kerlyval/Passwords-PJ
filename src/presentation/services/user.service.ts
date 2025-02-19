import { stat } from 'fs';
import { encriptAdapter } from '../../config/bcrypt.adapter';
import { JwtAdapter } from '../../config/jwt.adapter';
import { Status, User } from '../../data';
import { CustomError, LoginUserDto, RegisterUserDTO } from '../../domain';
import { PinService } from './pin.service';

export class UserService {
	constructor(private readonly pinService: PinService) {}

	async login(credentials: LoginUserDto) {
		const user = await this.findUserByEmail(credentials.email);

		const isMatching = encriptAdapter.compare(
			credentials.password,
			user.password,
		);
		if (!isMatching) throw CustomError.unAuthorized('Invalid Credentials');

		//3. Genera un jwt
		const token = await JwtAdapter.generateToken({ id: user.id }); //!Importante: Recordar que el payload del JWT viene con el ID del Usuario que se esta logeando
		if (!token) throw CustomError.internalServer('Error creating the JWL');

		return {
			token: token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		};
	}

	async register(userData: RegisterUserDTO) {
		//REvisar esto OJITO
		const user = new User();

		user.name = userData.name;
		user.surname = userData.surname;
		user.email = userData.email;
		user.cellphone = userData.cellphone;
		user.password = userData.password;

		//aqui colocar lo de la contrraseña
		//Recordar que el Pin es el que se relaciona aquí solo tengo que ver como
		//TODO: Pin

		try {
			const dbUser = await user.save();

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				cellphone: dbUser.cellphone,
			};
		} catch (error: any) {
			if (error.code === '23505') {
				throw CustomError.badRequest(
					`User with email: ${userData.email}  already exists`,
				);
			}
			throw CustomError.internalServer('Error creating user');
		}
	}

	async findUserByEmail(email: string) {
		const user = await User.findOne({
			where: {
				email,
				status: true,
			},
		});

		if (!user)
			throw CustomError.notFound(`User with email: ${email} not found`);

		return user;
	}

	async findOneUser(userId: string) {
		const result = await User.createQueryBuilder('user')
			.where('user.id = id', { id: userId })
			.andWhere('User.status = :userStatus', { userStatus: Status.ACTIVE })
			.getOne();

		if (!result) {
			throw CustomError.notFound('User not found');
		}

		return result;
	}

	//REVISAR ESTO
	async findAllUsers() {
		try {
			return await User.find({
				where: {
					status: Status.ACTIVE,
				},
				select: ['id', 'name', 'surname', 'email', 'cellphone', 'status'],
			});
		} catch (error) {
			throw CustomError.internalServer('Error obteniendo datos');
		}
	}

	/*TODO REVISAR ESTO TAMBIEN 
	async findAllUsers() {
		try {
			return await User.find({
				where: {
					status: true,
				},
				relations: ['user'],
				select: {
					user: {
						name: true,
						surname: true,
						email: true,
						cellphone: true,
						status: true,
					},
				},
			});
		} catch (error) {
			throw CustomError.internalServer('Error obteniendo datos');
		}
	}*/

	async updateUser(id: string, userData: any) {
		const user = await this.findOneUser(id);

		user.name = userData.name.toLowerCase().trim();
		user.surname = userData.surname.trim();
		user.email = userData.email.toLowerCase().trim();
		user.cellphone = userData.cellphone.trim();
		try {
			return await user.save();
		} catch (error) {
			throw CustomError.internalServer('Error updating user');
		}
	}

	async deletePost(id: string) {
		const post = await this.findOneUser(id);

		post.status = false;

		try {
			post.save();
		} catch (error) {
			throw CustomError.internalServer('Error deleting post');
		}
	}
}
