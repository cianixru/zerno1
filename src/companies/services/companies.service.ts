import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto } from '../dto';

import { CompanyRepository } from '../repositories';

@Injectable()
export class CompaniesService {
  constructor(private companyRepository: CompanyRepository) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const { inn } = createCompanyDto;
    const company = await this.companyRepository.findOne({
      inn,
    });
    if (company) {
      throw new HttpException('Company already exists', HttpStatus.BAD_REQUEST);
    }
    return this.companyRepository.save(createCompanyDto);
  }

  findAll() {
    return this.companyRepository.findAllWithSigners();
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOneWithSigner(id);
    if (!company) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.findOneWithSigner(id);
    if (!company) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.companyRepository.update(id, updateCompanyDto);
  }

  async remove(id: number) {
    const company = await this.companyRepository.findOne(id);
    if (!company) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.companyRepository.delete(id);
  }
}
