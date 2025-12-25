import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
