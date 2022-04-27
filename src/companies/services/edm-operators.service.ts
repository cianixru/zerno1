import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateEdmOperatorDto, UpdateEdmOperatorDto } from '../dto';
import {
  CompanyRepository,
  CompanyEdmOperatorRepository,
} from '../repositories';

@Injectable()
export class EdmOperatorsService {
  constructor(
    private companyRepository: CompanyRepository,
    private companyEdmOperatorRepository: CompanyEdmOperatorRepository,
  ) {}

  async findAllByCompanyId(companyId: number) {
    const company = await this.companyRepository.findOne(companyId);
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    return this.companyEdmOperatorRepository.findAllByCompanyId(companyId);
  }

  findOne(signerId: number) {
    return this.companyEdmOperatorRepository.findOne(signerId);
  }

  async create(companyId: number, createEdmOperatorDto: CreateEdmOperatorDto) {
    const company = await this.companyRepository.findOne(companyId);
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    return this.companyEdmOperatorRepository.save({
      companyId,
      ...createEdmOperatorDto,
    });
  }

  async update(id: number, updateEdmOperatorDto: UpdateEdmOperatorDto) {
    const signer = await this.companyEdmOperatorRepository.findOne(id);
    if (!signer) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.companyEdmOperatorRepository.update(id, updateEdmOperatorDto);
  }

  async remove(id: number) {
    const signer = await this.companyEdmOperatorRepository.findOne(id);
    if (!signer) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.companyEdmOperatorRepository.delete(id);
  }
}
