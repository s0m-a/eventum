import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository:UsersRepository ){}
    async create(createUserDto: CreateUserDTO){
        await this.validateCreateUserDto(createUserDto);
        return this.usersRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        });
    }
    // validating if email is unqiue
    private async validateCreateUserDto(createUserDTO: CreateUserDTO){
        try {
            await this.usersRepository.findOne({ email:  createUserDTO.email})
        } catch (error) {
            return;
        }
        throw new UnprocessableEntityException('Email already exits')
    };
    async verifyUser(email: string, password: string){
        const user = await this.usersRepository.findOne({email});
        if (!user) {
            throw new UnauthorizedException('user not found');
        }
        const passwordIsvalid = await bcrypt.compare(password, user.password);
        if(!passwordIsvalid){
            throw new UnauthorizedException('credentials are not valid');
        }
        return user;
    }

    async getUser(getUserDto: GetUserDto){
        return this.usersRepository.findOne(getUserDto)
    }
}
