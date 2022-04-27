import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  CreateRoleDto,
  UpdateRoleDto,
  CreatePermissionDto,
  UpdatePermissionDto,
} from './dto';
import { decode } from 'jsonwebtoken';
import { UserRepository, RoleRepository } from './repositories';
import { User } from './entities';
import { unlinkSync } from 'fs';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository, // private permissionRepository: PermissionRepository,
  ) {}

  findAllPermissionsOfUser(user: User) {
    // return this.userRepository.findAllPermissionsOfUser(user);
  }

  async create(createUserDto: CreateUserDto) {
    const { phoneNumber } = createUserDto;
    const user = await this.userRepository.findOne({ phoneNumber });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    //TODO: удалить секрет с помощью сериализации
    const { secret, ...createdUser } = await this.userRepository.save(
      createUserDto,
    );
    return createdUser;
  }

  createRole(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto);
  }
  createPermission(createPermissionDto: CreatePermissionDto) {
    // return this.permissionRepository.save(createPermissionDto);
  }

  findRoleAll() {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  findPermissionAll() {
    // return this.permissionRepository.find();
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const { secret, ...result } = user;
    return result;
  }

  async findRoleOne(id: number) {
    const role = await this.roleRepository.findOne(id, {
      relations: ['permissions'],
    });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return role;
  }

  async findPermissionOne(id: number) {
    // const permission = await this.permissionRepository.findOne(id);
    // if (!permission) {
    //   throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    // }
    // return permission;
  }

  async findOneByPhoneNumber(phoneNumber: string) {
    return this.userRepository.findOne({
      phoneNumber,
    });
  }

  clearTotpSecret(phoneNumber: string) {
    return this.userRepository.update({ phoneNumber }, { secret: null });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.updateOne(id, updateUserDto);
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne(id);
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return this.roleRepository.updateOne(id, updateRoleDto);
  }

  async updatePermission(id: number, updatePermissionDto: UpdatePermissionDto) {
    // const permission = await this.permissionRepository.findOne(id);
    // if (!permission) {
    //   throw new HttpException('Permission not found', HttpStatus.NOT_FOUND);
    // }
    // return this.permissionRepository.updateOne(id, updatePermissionDto);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.delete(id);
  }

  async removeRole(id: number) {
    const role = await this.roleRepository.findOne(id);
    if (!role) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.roleRepository.delete(id);
  }

  async removePermission(id: number) {
    // const permission = await this.permissionRepository.findOne(id);
    // if (!permission) {
    //   throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    // }
    // return this.permissionRepository.delete(id);
  }

  async getAvatar(userId: number) {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!user.avatar) {
      throw new HttpException('Avatar not found', HttpStatus.NOT_FOUND);
    }
    return user.avatar;
  }

  async saveAvatar(avatar, apiToken) {
    const { filename } = avatar;
    const decoded = decode(apiToken) as any;
    const user = await this.userRepository.findOne({
      phoneNumber: decoded.phoneNumber,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.avatar) {
      await unlinkSync(`./files/${user.avatar}`);
    }
    this.userRepository.update(
      {
        phoneNumber: decoded.phoneNumber,
      },
      { avatar: filename },
    );
    return { filename };
  }

  async deleteAvatar(apiToken) {
    const decoded = decode(apiToken) as any;
    const user = await this.userRepository.findOne({
      phoneNumber: decoded.phoneNumber,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.avatar) {
      unlinkSync(`./files/${user.avatar}`);
    }

    this.userRepository.update(
      {
        phoneNumber: decoded.phoneNumber,
      },
      { avatar: null },
    );
    return { deleted: user.avatar };
  }
}
