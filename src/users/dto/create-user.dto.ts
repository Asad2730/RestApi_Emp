import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { UserRole } from "../entities/user.entity"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsEnum(UserRole, {
        message: 'valid role required'
    })
    role: UserRole
}