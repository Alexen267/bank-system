import { SetMetadata } from '@nestjs/common';
import { ROLE_KEY } from '../constants';
import { RoleType } from '../enum/role-type';

export const Roles = (...role: [RoleType, ...RoleType[]]) =>
  SetMetadata(ROLE_KEY, role);
