import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { CropParametersService } from './crop-parameters.service';
import { CreateCropParameterDto } from './dto/create-crop-parameter.dto';
import { UpdateCropParameterDto } from './dto/update-crop-parameter.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Crop parameters')
@ApiBearerAuth()
@Controller('crop-parameters')
export class CropParametersController {
  constructor(private readonly cropParametersService: CropParametersService) {}

  @Post()
  create(@Body() createCropParameterDto: CreateCropParameterDto) {
    return this.cropParametersService.create(createCropParameterDto);
  }

  @Get()
  findAll() {
    return this.cropParametersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropParametersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCropParameterDto: UpdateCropParameterDto,
  ) {
    return this.cropParametersService.update(+id, updateCropParameterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropParametersService.remove(+id);
  }
}
