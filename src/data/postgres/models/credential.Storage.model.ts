import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Status } from '../../enums/status.enum';

@Entity()
export class CredentialStorage extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	//id, account, password, description, code_1, code_2, security_box_id, pin_id

	@Column('varchar', {
		length: 100,
		nullable: false,
	})
	account: string;

	@Column('varchar', {
		length: 250,
		nullable: false,
	})
	password: string;

	@Column('text', {
		nullable: false,
	})
	description: string;

	@Column('varchar', {
		length: 20,
	})
	code_1: string;

	@Column('varchar', {
		length: 20,
	})
	code_2: string;

	@Column('enum', {
		enum: Status,
		default: Status.ACTIVE,
	})
	status: Status;

	@Column('varchar', {
		nullable: false,
	})
	security_box_id: string;

	@Column('varchar', {
		nullable: false,
	})
	pin_id: string;
}
