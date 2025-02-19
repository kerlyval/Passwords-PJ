import { stat } from 'fs';
import { encriptAdapter } from '../../config/bcrypt.adapter';
import { JwtAdapter } from '../../config/jwt.adapter';
import { Status, User } from '../../data';
import { CustomError, LoginUserDto, RegisterUserDTO } from '../../domain';
import { PinService } from './pin.service';

export class UserService {
	constructor(private readonly pinService: PinService) {}

	//REVISAR ESTO
	async findAllUsers() {
		try {
			return await User.find({
				where: {
					status: Status.ACTIVE,
				},
				relations: ['user'],
				select: ['id', 'name', 'surname', 'email', 'cellphone', 'status'],
			});
		} catch (error) {
			throw CustomError.internalServer('Error getting data');
		}
	}

	//TODO REVISAR ESTO TAMBIEN
	/*async findAllUsers() {
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
	}
*/

	async findOneUser(id: string) {
		try {
			console.log('Searching for user with ID:', id);

			const user = await User.findOne({
				where: {
					id,
					status: Status.ACTIVE,
				},
				select: ['id', 'name', 'surname', 'email', 'cellphone', 'status'],
			});

			if (!user) {
				console.log('User not found in database!');
				throw CustomError.notFound('User not found');
			}

			console.log('User found in database:', user);
			return user;
		} catch (error) {
			console.error('Error in findOneUser:', error);
			throw CustomError.internalServer('User not found');
		}
	}

	async login(credentials: LoginUserDto) {
		const user = await this.findUserByEmail(credentials.email);

		//TODO

		console.log(' Usuario encontrado:', user);
		console.log('Contraseña almacenada en DB:', user.password);

		const isMatching = encriptAdapter.compare(
			credentials.password,
			user.password,
		);
		if (!isMatching) throw CustomError.unAuthorized('Invalid Credentials');

		//Generar un jwt
		const token = await JwtAdapter.generateToken({ id: user.id }); //!Importante: Recordar que el payload del JWT viene con el ID del Usuario que se esta logeando
		if (!token) throw CustomError.internalServer('Error creating token');

		return {
			token: token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		};
	}

	// async login(credentials: LoginUserDto) {
	// 	try {
	// 		console.log('🟢 Login attempt for email:', credentials.email);

	// 		// Buscar usuario en la BD
	// 		const user = await this.findUserByEmail(credentials.email);

	// 		if (!user) {
	// 			console.log('🔴 User not found in database');
	// 			throw CustomError.notFound('Invalid Credentials');
	// 		}

	// 		console.log('🟢 User found:', user);

	// 		// Verificar contraseña
	// 		console.log(
	// 			'Comparing:',
	// 			credentials.password,
	// 			'with hashed:',
	// 			user.password,
	// 		);
	// 		const isMatching = encriptAdapter.compare(
	// 			credentials.password,
	// 			user.password,
	// 		);
	// 		console.log('Contraseña ingresada:', credentials.password);
	// 		console.log('Contraseña en BD:', user.password);
	// 		console.log(
	// 			'Comparación bcrypt:',
	// 			encriptAdapter.compare(credentials.password, user.password),
	// 		);

	// 		if (!isMatching) {
	// 			console.log('🔴 Password mismatch');
	// 			throw CustomError.unAuthorized('Invalid Credentials');
	// 		}

	// 		console.log('🟢 Password correct, generating token...');

	// 		// Generar token
	// 		const token = await JwtAdapter.generateToken({ id: user.id });

	// 		if (!token) {
	// 			console.log('🔴 Token generation failed');
	// 			throw CustomError.internalServer('Error creating token');
	// 		}

	// 		console.log('🟢 Token generated successfully:', token);

	// 		return {
	// 			token,
	// 			user: {
	// 				id: user.id,
	// 				name: user.name,
	// 				email: user.email,
	// 			},
	// 		};
	// 	} catch (error) {
	// 		console.error('❌ Error in login:', error);
	// 		throw error;
	// 	}
	// }

	async register(userData: RegisterUserDTO) {
		//REvisar esto OJITO
		const user = new User();

		user.name = userData.name;
		user.surname = userData.surname;
		user.email = userData.email;
		user.cellphone = userData.cellphone;
		// user.password = userData.password;

		//Recordar que el Pin es el que se relaciona aquí solo tengo que ver como
		//TODO: Pin

		console.log('Contraseña antes de encriptar ', userData.password);
		user.password = encriptAdapter.hash(userData.password);
		console.log('contraseña encriptada', user.password);

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
				status: Status.ACTIVE,
			},
		});

		if (!user)
			throw CustomError.notFound(`User with email: ${email} not found`);
		//TODO
		console.log(' Usuario encontrado:', user);
		console.log('Contraseña almacenada en DB:', user.password);

		return user;
	}

	async updateUser(id: string, userData: any) {
		const user = await this.findOneUser(id);

		user.name = userData.name.toLowerCase().trim();
		user.surname = userData.surname.toLowerCase().trim();
		user.email = userData.email.toLowerCase().trim();
		user.cellphone = userData.cellphone.trim();
		try {
			return await user.save();
		} catch (error) {
			throw CustomError.internalServer('Error updating user');
		}
	}

	async deleteUser(id: string) {
		const user = await this.findOneUser(id);

		user.status = Status.DELETED;

		try {
			await user.save();
		} catch (error) {
			throw CustomError.internalServer('Error deleting user');
		}
	}
}
