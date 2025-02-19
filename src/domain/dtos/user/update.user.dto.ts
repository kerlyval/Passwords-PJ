import { regularExp } from '../../../config';

export class UpdateUserDTO {
	constructor(
		public readonly name: string,
		public readonly surname: string,
		public readonly email: string,
		public readonly cellphone: string,
	) {}

	static create(object: { [key: string]: any }): [string?, UpdateUserDTO?] {
		const { name, surname, email, cellphone } = object;

		// AQUI EMPEZAMOS A VALIDAR
		if (!name) return ['Name is required'];
		if (name.length < 4) return ['Name must be at least 4 characters'];

		if (!surname) return ['Missing surname '];
		if (surname.length < 5) return ['Surname must be at least 5 characters'];

		if (!email) return ['Missing email'];
		if (email.length < 5) return ['Email must be at least 5 characters'];
		if (!regularExp.email.test(email)) return ['Invalid email format'];

		if (!cellphone) return ['Missing cellphone'];
		if (cellphone < 6) return ['Cellphone must be at least 6 digits'];

		return [undefined, new UpdateUserDTO(name, surname, email, cellphone)];
	}
}
