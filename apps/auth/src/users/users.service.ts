import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bycrypt from "bcryptjs"

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository:UsersRepository ){}
    async create(createUserDto: CreateUserDTO){
        return this.usersRepository.create({
            ...createUserDto,
            password: await bycrypt.hash(createUserDto.password, 10)
        });
    }
    async verifyUser(email: string, password: string){
        const user = await this.usersRepository.findOne({email});
        const passwordIsvalid = await bycrypt.compare(password, user.password);
        if(!passwordIsvalid){
            throw new UnauthorizedException('credentials are not valid');
        }
        return user;
    }

}
