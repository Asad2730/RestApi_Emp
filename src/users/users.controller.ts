import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './entities/user.entity';

@Controller('users')
export class UsersController {
    
    constructor(private readonly usersService:UsersService){}
    
    @Get() //get users or /users?role (make it optional)
    async findAll(@Query('role') role?:UserRole):Promise<User[]> {
        return await this.usersService.findAll(role)
    }

    @Get(':id')
    async findOne(@Param('id',ParseIntPipe) id: number):Promise<User> {
        return await this.usersService.findOne(id)
    }

    @Post()
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto):Promise<User> {
        return await this.usersService.create(createUserDto)
    }

    @Patch(':id')
    async update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto):Promise<User> {
        return await this.usersService.update(id,updateUserDto)
    }

    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id: number):Promise<User>{
        return await this.usersService.delete(id)
    }
}
