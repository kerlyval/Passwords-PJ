export class UpdateCredentialStorageDTO {
	constructor(
		public readonly account: string,
		public readonly password: string,
		public readonly description: string,
		public readonly code_1: string,
		public readonly code_2: string,
	) {}

	static update(object: {
		[key: string]: any;
	}): [string?, UpdateCredentialStorageDTO?] {
		const { account, password, description, code_1, code_2 } = object;

		// AQUI EMPEZAMOS A VALIDAR
		if (!account) return ['Account is required'];
		if (account.length < 4) return ['Account must have at least 4 characters'];

		if (!password) return ['Email is required'];
		if (password.length < 8) return ['Email must have at least 8 letters'];

		if (!description) return ['Description is required'];
		if (description.length < 6) return ['Please provide a description'];

		if (!code_1) return ['Account is required'];
		if (code_1.length < 3) return ['Account must have at least 3 characteres'];

		if (!code_2) return ['Account is required'];
		if (code_2.length < 3) return ['Account must have at least 3 characteres'];

		return [
			undefined,
			new UpdateCredentialStorageDTO(
				account,
				password,
				description,
				code_1,
				code_2,
			),
		];
	}
}
