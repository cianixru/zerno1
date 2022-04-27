import { EntityRepository, Repository } from 'typeorm';
import { Obj } from '../entities';

@EntityRepository(Obj)
export class ObjectRepository extends Repository<Obj> {
  findByName(name: string) {
    return this.findOne({ where: { name } });
  }
}
