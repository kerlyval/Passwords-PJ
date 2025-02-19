import { z } from 'zod';

const registerUserSchema = z.object({
	name: z
		.string({ message: 'Name is required' })
		.min(4, { message: 'Account must have at least 4 characters' }),

	userId: z.string().uuid({ message: 'UserID is required' }),
});

export class CreateSecurityBoxDTO {
	constructor(
		public readonly name: string,
		public readonly favorite: string,
		public readonly icon: string,
		public readonly userId: string,
	) {}

	static create(object: {
		[key: string]: any;
	}): [string?, CreateSecurityBoxDTO?] {
		const { name, favorite, icon, userId } = object;

		const result = registerUserSchema.safeParse(object);

		if (!result.success) {
			const errorMessages = result.error.errors.reduce((acc: any, err: any) => {
				const field = err.path.join('.');
				acc[field] = err.message;
				return acc;
			}, {} as Record<string, string>);

			return [errorMessages];
		}

		return [undefined, new CreateSecurityBoxDTO(name, favorite, icon, userId)];
	}
}
