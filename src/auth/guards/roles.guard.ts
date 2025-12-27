import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/common/constants';
import { RoleType } from 'src/common/enum/role-type';

export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector?.getAllAndOverride<RoleType[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    const client = context.switchToHttp()?.getRequest()?.client;
    return requiredRoles?.some((role) => role === client.role);
  }
}
