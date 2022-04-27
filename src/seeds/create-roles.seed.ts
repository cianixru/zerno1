import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Permission, Role } from '../users/entities';
import { permissionSample } from './data-samples';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    //   const permissions = await connection
    //     .createQueryBuilder()
    //     .select()
    //     .from(Permission, 'permissions')
    //     .where(`permissions.condition::json @> \'{}\'`)
    //     .getMany();
  }
}
