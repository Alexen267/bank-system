import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/common/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const acessToken = this.extractTokenFromHeader(request);

    if (!acessToken) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(acessToken, {
        secret: process.env.JWT_SECRET,
      });

      request['client'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
    const [type, acessToken] = authHeader?.split(' ') ?? [];
    return type === 'Bearer' ? acessToken : undefined;
  }
}
