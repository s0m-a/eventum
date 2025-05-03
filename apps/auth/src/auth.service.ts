import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {JwtService} from '@nestjs/jwt'
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
@Injectable()
export class AuthService {
constructor(
  private readonly configServices: ConfigService,
  private readonly jwtService: JwtService,
 ){}

  async login(user: UserDocument, response: Response){
    const tokenPayLoad = { userId: user._id.toHexString() }
    const expires = new Date()
    expires.setSeconds( expires.getSeconds() + this.configServices.get('JWT_EXPIRATION'))

    const token = this.jwtService.sign(tokenPayLoad);
    response.cookie('Authentication', token,{
      httpOnly: true,
      expires,
    })
  }

}
