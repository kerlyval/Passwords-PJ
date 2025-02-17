import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pin extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 250,
		nullable: false,
	})
	code: string;

	// @ManyToOne(() => User, (user) => user.posts)
	// @JoinColumn({ name: 'publish_by' }) //así le podemos cambiar el nombre
	// user: User;

	// @OneToMany(() => Comment, (comment) => comment.post)
	// comments: Comment[];
}
