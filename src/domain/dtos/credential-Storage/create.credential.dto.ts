import { z } from 'zod';

const registerUserSchema = z.object({
	account: z
		.string({ message: 'Account is required' })
		.min(5, { message: 'Account must have at least 5 characters' }),

	password: z
		.string({ message: 'Password is required' })
		.min(8, { message: 'Password must have at least 8 characters' }),

	description: z.string().min(1, { message: 'Please provide a description' }),

	code_1: z.string().min(3, { message: 'UserID is required' }),

	code_2: z.string().min(3, { message: 'UserID is required' }),

	securityId: z.string().uuid({ message: 'UserID is required' }),
});

export class CreateCredentialStorageDTO {
	constructor(
		public readonly account: string,
		public readonly password: string,
		public readonly description: string,
		public readonly code_1: string,
		public readonly code_2: string,
		public readonly securityId: string,
	) {}

	static create(object: {
		[key: string]: any;
	}): [string?, CreateCredentialStorageDTO?] {
		const { account, password, description, code_1, code_2, securityId } =
			object;

		const result = registerUserSchema.safeParse(object);

		if (!result.success) {
			const errorMessages = result.error.errors.reduce((acc: any, err: any) => {
				const field = err.path.join('.');
				acc[field] = err.message;
				return acc;
			}, {} as Record<string, string>);

			return [errorMessages];
		}

		return [
			undefined,
			new CreateCredentialStorageDTO(
				account,
				password,
				description,
				code_1,
				code_2,
				securityId,
			),
		];
	}
}
