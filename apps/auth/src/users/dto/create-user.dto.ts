import { isEmail, IsEmail, isStrongPassword, IsStrongPassword } from "class-validator";

export class CreateUserDTO{
    @IsEmail()
    email:string;

    @IsStrongPassword()
    password:string;
}