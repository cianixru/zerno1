import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Obj } from '../users/entities';
import { objSample } from './data-samples';

export default class CreateObjects implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Obj)
      .values(objSample)
      .orIgnore()
      .execute();
  }
}
