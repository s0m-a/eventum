import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
     // Inject the currently authenticated user (set by the guard)
       @CurrentUser() user: UserDocument,
       // Inject the Express response object, allowing passthrough so we can set cookies in http
       @Res ({passthrough: true}) response: Response,
       ){
        await this.authService.login(user, response)
        response.send(user)
       }


}
