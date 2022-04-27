import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { RolesService } from './roles.service';
import { UsersController } from './users.controller';
import { RolesController } from './roles.controller';
import { PermissionsController } from './permissions.controller';
import { ObjectsController } from './objects.controller';
import { PermissionsService } from './permissions.service';
import { ObjectsService } from './objects.service';

import { User, Role, Permission, Obj } from './entities';
import { AuthzService } from '../authz/authz.service';
import { AuthzModule } from '../authz/authz.module';
import { CaslAbilityFactory } from '../authz/casl-ability.factory';
import {
  PermissionRepository,
  UserRepository,
  RoleRepository,
  ObjectRepository,
} from './repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      RoleRepository,
      PermissionRepository,
      ObjectRepository,
      Permission,
      Role,
      Obj,
    ]),
    AuthzModule,
  ],
  controllers: [
    UsersController,
    RolesController,
    PermissionsController,
    ObjectsController,
  ],
  providers: [UsersService, RolesService, PermissionsService, ObjectsService],
  exports: [UsersService],
})
export class UsersModule {}
