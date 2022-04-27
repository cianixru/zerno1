import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { CropRepository } from './repositories';

@Injectable()
export class CropsService {
  constructor(private cropRepository: CropRepository) {}

  create(createCropDto: CreateCropDto) {
    return this.cropRepository.save(createCropDto);
  }

  findAll() {
    return this.cropRepository.find({ relations: ['parameters'] });
  }

  async findOne(id: number) {
    // const crop = await this.cropRepository.findOneWithParameters(id);
    //TODO: вынести в репозиторий
    const crop = await this.cropRepository.findOne(id, {
      relations: ['parameters'],
    });
    if (!crop) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return crop;
  }

  async update(id: number, updateCropDto: UpdateCropDto) {
    const crop = await this.cropRepository.findOne(id);
    if (!crop) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.cropRepository.update(id, updateCropDto);
  }

  async remove(id: number) {
    const crop = await this.cropRepository.findOne(id);
    if (!crop) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.cropRepository.delete(id);
  }
}
