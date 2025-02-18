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
export class SecurityBox extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	//name, favorite[bool], icono, status [Active]

	@Column('varchar', {
		length: 100,
		nullable: false,
	})
	name: string;

	@Column('bool', {
		default: false,
	})
	favorite: boolean;

	@Column('varchar', {
		length: 45,
		nullable: false,
		//checar como hacer esto
	})
	icon: string;

	//checar esto del status OJITOOO!!!
	@Column('varchar', {
		nullable: false,
		default: 'Active',
	})
	status: string;

	// @ManyToOne(() => SecurityBox, (user) => user.security_boxes)
	// @JoinColumn({ name: 'UserId' })
	// user: User;

	// @OneToMany(
	// 	() => CredentialStorage,
	// 	(credentialStorage) => credentialStorage.securityBox,
	// )
	// @JoinColumn({ name: 'CredentialStorageId' })
	// credentialsStorage: CredentialStorage[];
}
