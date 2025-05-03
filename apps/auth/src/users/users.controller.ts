import { Body, Controller,Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    @Post()
    async createUser(@Body() createuserDto:CreateUserDTO){
        return this.usersService.create(createuserDto)
    }
}
