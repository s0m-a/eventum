import { Injectable, UnauthorizedException } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport'
import {Strategy} from 'passport-local'
import { UsersService } from "../src/users/users.service";
/**
 * passport have different strategies for authenticating users, 
 * here we are handling local auth i.e email and password
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly usersService: UsersService){
        super({ usernameField:'email' })
    }
    async validate(email:string, password:string){
        /**
         * anything return in this function is automatically added to the request object 
         */
        try {
            return this.usersService.verifyUser(email, password)
            
        } catch (err) {
            throw new UnauthorizedException(err)
        }
    }
}