import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository:UsersRepository ){}
    async create(createUserDto: CreateUserDTO){
        return this.usersRepository.create(createUserDto)
    }
}
