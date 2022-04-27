import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Obj, Permission } from '../users/entities';
import { permissionSample } from './data-samples';

export default class CreatePermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const objs = await connection
      .getRepository(Obj)
      .createQueryBuilder()
      .select('objects.name')
      .select('objects.id')
      .from(Obj, 'objects')
      .getMany();

    const permissions = permissionSample.flatMap((sample) => {
      const permission = [];
      objs.forEach((obj) => {
        permission.push({ ...sample, objId: obj.id });
      });
      return permission;
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
