import { EntityRepository, Repository } from 'typeorm';
import { Permission } from '../entities';
import { UpdatePermissionDto } from '../dto';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
  async updateOne(id: number, updatePermissionDto: UpdatePermissionDto) {
    return this.update(id, updatePermissionDto);
  }
}
