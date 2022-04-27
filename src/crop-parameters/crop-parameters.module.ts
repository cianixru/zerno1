import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropParametersService } from './crop-parameters.service';
import { CropParametersController } from './crop-parameters.controller';
import { CropParameterRepository } from './repositories';
import { CropRepository } from '../crops/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([CropParameterRepository, CropRepository]),
  ],

  controllers: [CropParametersController],
  providers: [CropParametersService],
})
export class CropParametersModule {}
