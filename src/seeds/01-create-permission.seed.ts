import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Obj, Permission } from '../users/entities';
import { permissionSample } from './data-samples';

export default class CreatePermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const objs = await connection
      .getRepository(Obj)
      .createQueryBuilder()
      .select('name')
      .getMany();

    const permissions = objs.flatMap((obj) => {
      return permissionSample.map((sample) => {
        sample.objId = obj.id;
        return sample;
      });
    });
    await connection
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values(permissions)
      .orIgnore()
      .execute();
  }
}
