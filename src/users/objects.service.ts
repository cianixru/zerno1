import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  CreatePermissionDto,
  UpdatePermissionDto,
} from './dto';
import { decode } from 'jsonwebtoken';
import { ObjectRepository } from './repositories';
import { User, Permission } from './entities';
import { unlinkSync } from 'fs';

@Injectable()
export class ObjectsService {
  constructor(private objectRepository: ObjectRepository) {}

  findAll() {
    return this.objectRepository.find();
  }
}
