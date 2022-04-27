import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateWarehouseDto, UpdateWarehouseDto } from './dto';
import { WarehouseRepository } from './repositories';

@Injectable()
export class WarehousesService {
  constructor(private warehouseRepository: WarehouseRepository) {}
  create(createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseRepository.save(createWarehouseDto);
  }

  findAll() {
    return this.warehouseRepository.find();
  }

  async findOne(id: number) {
    const warehouse = await this.warehouseRepository.findOne(id);
    if (!warehouse) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return warehouse;
  }

  async update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    const warehouse = await this.warehouseRepository.findOne(id);
    if (!warehouse) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.warehouseRepository.update(id, updateWarehouseDto);
  }

  async remove(id: number) {
    const warehouse = await this.warehouseRepository.findOne(id);
    if (!warehouse) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.warehouseRepository.delete(id);
  }
}
