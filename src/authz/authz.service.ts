import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { decode } from 'jsonwebtoken';
import { UserRepository } from '../users/repositories';
import { User } from '../users/entities';
import { unlinkSync } from 'fs';

@Injectable()
export class AuthzService {
  constructor(private userRepository: UserRepository) {}

  findAllPermissionsOfUser(user: User) {
    return this.userRepository.findAllPermissionsOfUser(user);
  }
}
