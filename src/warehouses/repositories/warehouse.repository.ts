import { EntityRepository, Repository } from 'typeorm';
import { Warehouse } from '../entities';

@EntityRepository(Warehouse)
export class WarehouseRepository extends Repository<Warehouse> {}
