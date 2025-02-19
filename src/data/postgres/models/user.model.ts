import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { encriptAdapter } from '../../../config';
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

	// @OneToMany(() => Post, (post) => post.user)
	// posts: Post[];

	// @OneToMany(() => Comment, (comment) => comment.user)
	// comments: Comment[];

	// @BeforeInsert()
	// encryptedPassword() {
	// 	this.password = encriptAdapter.hash(this.password);
	// }
}
