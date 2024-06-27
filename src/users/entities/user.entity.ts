import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
    INTERN = 'INTERN',
    ENGINEER = 'ENGINEER',
    ADMIN = 'ADMIN',
}

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    email:string

    @Column({
        type:'enum',
        enum:UserRole,
        default:UserRole.INTERN
    })

    role:UserRole
}
