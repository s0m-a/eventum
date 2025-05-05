import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt'
import { UsersService } from "../src/users/users.service";
import {Request} from "express"
import { TokenPayload } from "../src/interfaces/token-payload.interface";

/**
 * this strategy tells NestJS how to extract, verify, and validate 
 * the JWT token when a user makes a request.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly usersService: UsersService,
        configService : ConfigService,
        
    ){
        const jwtSecret = configService.get('JWT_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not set in configuration');
        }
        
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.Authentication,
            ]),
            secretOrKey: jwtSecret,
        });
    }
    async validate({ userId}:TokenPayload){
        return this.usersService.getUser({_id: userId})
    }
}