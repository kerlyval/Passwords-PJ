import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

export enum Status {
	ACTIVE = 'ACTIVE',
	DELETED = 'DELETED',
}
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
	@Column('enum', {
		enum: Status,
		default: Status.ACTIVE,
	})
	status: Status;

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
