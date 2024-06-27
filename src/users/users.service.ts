import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {


    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    async findAll(role?: UserRole):Promise<User[]> {
        if (role) {
            const rolsesArray = await this.userRepo.findBy({role:role})
            if (!rolsesArray.length) throw new NotFoundException('user role not found')
            return rolsesArray
        }

        return await this.userRepo.find()
    }


   async findOne(id: number):Promise<User> {
        const user = await this.userRepo.findOneBy({id})
        if (!user) throw new NotFoundException('user not found')
        return user
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { name, email, role } = createUserDto
        const user = this.userRepo.create({ name, email, role })
        return await this.userRepo.save(user)
    }


    async update(id: number, updatedUser: UpdateUserDto) {
        let user =  await this.findOne(id)
        user =  Object.assign(user,updatedUser)
        await this.userRepo.save(user)
        return user
    }


   async delete(id: number):Promise<User> {
        const removedUser = this.findOne(id)
        this.userRepo.delete(id)
        return removedUser
    }
}
