import { EntityRepository, Repository } from 'typeorm';
import { Crop } from '../entities';

@EntityRepository(Crop)
export class CropRepository extends Repository<Crop> {
  public findOneWithParameters(id: number) {
    return this.manager.findOne(CropRepository, id, {
      relations: ['parameters'],
    });
  }
}
