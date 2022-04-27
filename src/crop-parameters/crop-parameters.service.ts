import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCropParameterDto, UpdateCropParameterDto } from './dto';
import { CropParameterRepository } from './repositories';
import { CropRepository } from '../crops/repositories';

@Injectable()
export class CropParametersService {
  constructor(
    private cropParameterRepository: CropParameterRepository,
    private cropRepository: CropRepository,
  ) {}
  async create(createCropParameterDto: CreateCropParameterDto) {
    const { cropId } = createCropParameterDto;
    const crop = await this.cropRepository.findOne(cropId);
    if (!crop) {
      throw new HttpException('Crop not found', HttpStatus.BAD_REQUEST);
    }
    return this.cropParameterRepository.save(createCropParameterDto);
  }

  findAll() {
    return this.cropParameterRepository.find();
  }

  findOne(id: number) {
    return this.cropParameterRepository.findOne(id);
  }

  async update(id: number, updateCropParameterDto: UpdateCropParameterDto) {
    const { cropId } = updateCropParameterDto;
    const crop = await this.cropRepository.findOne(cropId);
    if (!crop) {
      throw new HttpException('Crop not found', HttpStatus.BAD_REQUEST);
    }
    const cropParameter = await this.cropParameterRepository.findOne(id);
    if (!cropParameter) {
      throw new HttpException('Parameter not found', HttpStatus.NOT_FOUND);
    }
    return this.cropParameterRepository.update(id, updateCropParameterDto);
  }

  async remove(id: number) {
    const cropParameter = await this.cropParameterRepository.findOne(id);
    if (!cropParameter) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.cropParameterRepository.delete(id);
  }
}
