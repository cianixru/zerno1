import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder } from '@casl/ability';
import { AuthzService } from './authz.service';
import { User } from '../users/entities';
import { Permission, PermissionCondition } from '../users/entities';
import { PermissionAction } from '../types';
export type PermissionObjectType = any;
export type AppAbility = Ability<[PermissionAction, PermissionObjectType]>;
interface CaslPermission {
  action: PermissionAction;
  // In our database, Invoice, Project... are called "object"
  // but in CASL they are called "subject"
  subject: string;
  condition?: PermissionCondition;
}
@Injectable()
export class CaslAbilityFactory {
  constructor(private authzService: AuthzService) {}
  async createForUser(user: User): Promise<AppAbility> {
    const dbPermissions: Permission[] =
      await this.authzService.findAllPermissionsOfUser(user);
    const caslPermissions: CaslPermission[] = dbPermissions.map((p) => {
      return {
        action: p.action,
        subject: p.obj.name,
        conditions: Permission.parseCondition(p.condition, user),
      };
    });
    return new Ability<[PermissionAction, PermissionObjectType]>(
      caslPermissions,
    );
  }
}
