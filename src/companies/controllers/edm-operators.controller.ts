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
import { EdmOperatorsService } from '../services';
import { CreateEdmOperatorDto, UpdateEdmOperatorDto } from '../dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Companies')
@ApiBearerAuth()
@Controller('companies')
export class EdmOperatorsController {
  constructor(private readonly edmOperatorsService: EdmOperatorsService) {}
  @Get(':companyId/edm-operators')
  findAllByCompanyId(@Param('companyId') companyId: string) {
    return this.edmOperatorsService.findAllByCompanyId(+companyId);
  }

  @Get('edm-operators/:edmOperatorId')
  findOne(@Param('edmOperatorId') edmOperatorId: string) {
    return this.edmOperatorsService.findOne(+edmOperatorId);
  }

  @Post(':companyId/edm-operators')
  create(
    @Param('companyId') companyId: string,
    @Body() createEdmOperatorDto: CreateEdmOperatorDto,
  ) {
    return this.edmOperatorsService.create(+companyId, createEdmOperatorDto);
  }

  @Patch('edm-operators/:edmOperatorId')
  update(
    @Param('edmOperatorId') edmOperatorId: string,
    @Body() updateEdmOperatorDto: UpdateEdmOperatorDto,
  ) {
    return this.edmOperatorsService.update(
      +edmOperatorId,
      updateEdmOperatorDto,
    );
  }

  @Delete('edm-operators/:edmOperatorId')
  remove(@Param('edmOperatorId') edmOperatorId: string) {
    return this.edmOperatorsService.remove(+edmOperatorId);
  }
}
