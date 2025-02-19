import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Status } from '../../enums/status.enum';

// decoradores, le dan funcionalidades a un método, clase o producto
@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	// id uuid [pk], username, surname, email, cellphone, password, status

	@Column('varchar', {
		length: 100,
		nullable: false,
	})
	name: string;

	@Column('varchar', {
		length: 100,
		nullable: false,
	})
	surname: string;

	@Column('varchar', {
		length: 150,
		nullable: false,
		unique: true,
	})
	email: string;

	@Column('varchar', {
		length: 20,
		nullable: false,
	})
	cellphone: string;

	@Column('varchar', {
		length: 255,
		nullable: false,
	})
	password: string;

	@Column('enum', {
		enum: Status,
		default: Status.ACTIVE,
	})
	status: Status;
}
