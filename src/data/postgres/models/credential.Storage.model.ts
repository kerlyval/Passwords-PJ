import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { SecurityBox } from './securityBox.model';

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

	// @Column('bool', {
	// 	default: true,
	// })
	// status: boolean;

	@Column('varchar', {
		nullable: false,
	})
	security_box_id: string;

	@Column('varchar', {
		nullable: false,
	})
	pin_id: string;

	// 	@ManyToOne(() => SecurityBox, (user) => user.comments)
	// 	@JoinColumn({ name: 'commented_by' })
	// 	user: User;

	// 	@ManyToOne(() => Post, (post) => post.comments)
	// 	@JoinColumn({ name: 'related_post_id' })
	// 	post: Post;
}
