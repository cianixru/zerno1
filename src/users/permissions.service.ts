import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  CreatePermissionDto,
  UpdatePermissionDto,
} from './dto';
import { decode } from 'jsonwebtoken';
import { PermissionRepository, ObjectRepository } from './repositories';
import { User, Permission } from './entities';
import { unlinkSync } from 'fs';

@Injectable()
export class PermissionsService {
  constructor(
    private permissionRepository: PermissionRepository,
    private objectRepository: ObjectRepository,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const { objId } = createPermissionDto;
    const obj = await this.objectRepository.findOne(objId);
    if (!obj) {
      throw new HttpException('Object not found', HttpStatus.NOT_FOUND);
    }
    return this.permissionRepository.save(createPermissionDto);
  }

  findAll() {
    return this.permissionRepository.find();
  }

  async findOne(id: number) {
    const permission = await this.permissionRepository.findOne(id);
    if (!permission) {
      throw new HttpException('Permission not found', HttpStatus.NOT_FOUND);
    }
    return permission;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.permissionRepository.findOne(id);
    if (!permission) {
      throw new HttpException('Permission not found', HttpStatus.NOT_FOUND);
    }
    return this.permissionRepository.updateOne(id, updatePermissionDto);
  }

  async remove(id: number) {
    const permission = await this.permissionRepository.findOne(id);
    if (!permission) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.permissionRepository.delete(id);
  }
}
