import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  CreateRoleDto,
  UpdateRoleDto,
  CreatePermissionDto,
  UpdatePermissionDto,
  AddPermissionToRoleDto,
} from './dto';
import { decode } from 'jsonwebtoken';
import { RoleRepository, PermissionRepository } from './repositories';
import { User } from './entities';
import { unlinkSync } from 'fs';
// import { CaslAbilityFactory } from '../authz/casl-ability.factory';

@Injectable()
export class RolesService {
  constructor(
    private roleRepository: RoleRepository,
    private permissionRepository: PermissionRepository,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto);
  }

  findAll() {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  addPermissionsToRole(
    roleId: number,
    addPermissionToRoleDto: AddPermissionToRoleDto,
  ) {
    return this.roleRepository.addPermissionsToRole(
      roleId,
      addPermissionToRoleDto,
    );
  }

  deletePermissionFromRole(roleId: number, permissionId: number) {
    return this.roleRepository.deletePermissionsFromRole(roleId, permissionId);
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findRoleFull(id);
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne(id);
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return this.roleRepository.updateOne(id, updateRoleDto);
  }

  async remove(id: number) {
    const role = await this.roleRepository.findOne(id);
    if (!role) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.roleRepository.delete(id);
  }
}
