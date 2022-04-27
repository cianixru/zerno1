import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Role, Permission } from '../entities';
import { UpdateRoleDto, AddPermissionToRoleDto } from '../dto';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  async findRoleFull(roleId: number) {
    const role = await this.createQueryBuilder('role')
      .where('role.id = :id', { id: roleId })
      .leftJoinAndSelect('role.permissions', 'permissions')
      .leftJoinAndSelect('permissions.obj', 'obj')
      .getOne();
    return role;
  }

  async updateOne(id: number, updateRoleDto: UpdateRoleDto) {
    return this.update(id, updateRoleDto);
  }

  async addPermissionsToRole(
    roleId: number,
    addPermissionToRoleDto: AddPermissionToRoleDto,
  ) {
    const role = await this.findOne(roleId);
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    const permissions = await this.manager
      .getRepository(Permission)
      .createQueryBuilder('permissions')
      .where('id IN(:...ids)', { ids: addPermissionToRoleDto.permissionIds })
      .getMany();

    if (!permissions.length) {
      throw new HttpException('Permissions not found', HttpStatus.NOT_FOUND);
    }
    role.permissions = permissions;
    return this.manager.save(role);
  }

  async deletePermissionsFromRole(roleId: number, permissionId: number) {
    const role = await this.findOne(roleId);
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    role.permissions = role.permissions.filter((permission) => {
      return permission.id !== permissionId;
    });
    return this.manager.save(role);
  }
}
