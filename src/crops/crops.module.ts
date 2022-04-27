import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropsService } from './crops.service';
import { CropsController } from './crops.controller';
import { CropRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([CropRepository])],
  controllers: [CropsController],
  providers: [CropsService],
})
export class CropsModule {}
