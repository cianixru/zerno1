import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities';
import { UpdateUserDto } from '../dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findAllPermissionsOfUser(user: User) {
    const { role } = await this.createQueryBuilder('user')
      .where('user.id = :id', { id: user.id })
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .leftJoinAndSelect('permissions.obj', 'obj')
      .getOne();
    return role.permissions;
  }

  saveTotpSecret(phoneNumber: string, secret: string): Promise<void> {
    this.upsert([{ phoneNumber, secret }], ['phoneNumber']);
    return;
  }

  saveRefreshToken(phoneNumber: string, refreshToken: string) {
    this.upsert([{ phoneNumber, refreshToken }], ['phoneNumber']);
  }

  async getTotpKey(phoneNumber: string): Promise<string> {
    const { secret } = await this.findOne({
      select: ['secret'],
      where: { phoneNumber },
    });
    return secret;
  }

  async getRefreshToken(phoneNumber: string) {
    const { refreshToken } = await this.findOne({
      select: ['refreshToken'],
      where: { phoneNumber },
    });
    return refreshToken;
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    return this.update(id, updateUserDto);
  }
}
