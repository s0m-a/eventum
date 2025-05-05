import {AuthGuard} from '@nestjs/passport'

/**
 * 'local' is the default name and we are referencing: 
 *    export class LocalStrategy extends PassportStrategy(Strategy){...
 */
export class LocalAuthGuard extends AuthGuard('local'){}
