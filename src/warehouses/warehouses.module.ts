import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseRepository])],
  controllers: [WarehousesController],
  providers: [WarehousesService],
})
export class WarehousesModule {}
