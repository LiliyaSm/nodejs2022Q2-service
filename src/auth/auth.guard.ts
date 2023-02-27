import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify, JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const [scheme, token] = request.headers.authorization.split(' ');

      if (!token || scheme !== 'Bearer') {
        // 401
        throw new UnauthorizedException(
          'Access token is missing or wrong scheme',
        );
      }
      verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;
    } catch {
      throw new UnauthorizedException('Access token is invalid');
    }
    return true;
  }
}
