import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly logger: LoggerService = new Logger('jwt-auth-guard')
  ) {
    super({
      passReqToCallback: true,
    });
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    this.logger.debug(info);
    // If authentication fails, we throw an UnauthorizedException so that
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
