import { EntityRepository, Repository } from 'typeorm';
import { CropParameter } from '../entities';
// import { CreateCropParameterDto, UpdateCropParameterDto } from '../dto';

@EntityRepository(CropParameter)
export class CropParameterRepository extends Repository<CropParameter> {}
