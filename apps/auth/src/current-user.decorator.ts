/**
 * here we are gonna extract user object added to the request when we called the verifyuser() 
 * in authcontroller and use it to get the current user
 * and make a custom decorator
 */

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDocument } from "./users/models/user.schema";

const getCurrentUserByContext = (context: ExecutionContext): UserDocument =>{
    return context.switchToHttp().getRequest().user
}

export const CurrentUser = createParamDecorator(
    (_data:unknown, context: ExecutionContext) =>{
        return  getCurrentUserByContext(context)
    }
)