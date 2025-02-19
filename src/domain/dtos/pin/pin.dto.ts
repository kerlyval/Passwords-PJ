export class PinDTO {
	constructor(public code: string) {}

	static create(object: { [key: string]: any }): [string?, PinDTO?] {
		const { code } = object;

		if (!code) return ['Code is required'];
		if (code.length < 3) return ['Account must have at least 3 characteres'];

		return [undefined, new PinDTO(code)];
	}
}
