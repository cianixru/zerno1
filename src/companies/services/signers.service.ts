import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCompanySignerDto, UpdateCompanySignerDto } from '../dto';
import { CompanyRepository, CompanySignerRepository } from '../repositories';

@Injectable()
export class SignersService {
  constructor(
    private companyRepository: CompanyRepository,
    private companySignerRepository: CompanySignerRepository,
  ) {}

  async findAllByCompanyId(companyId: number) {
    const company = await this.companyRepository.findOneWithSigner(companyId);
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    return this.companySignerRepository.findAllByCompanyId(companyId);
  }

  findOne(signerId: number) {
    return this.companySignerRepository.findOne(signerId);
  }

  async create(
    companyId: number,
    createCompanySignerDto: CreateCompanySignerDto,
  ) {
    const company = await this.companyRepository.findOne(companyId);
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    return this.companySignerRepository.save({
      companyId,
      ...createCompanySignerDto,
    });
  }

  async update(id: number, updateCompanySignerDto: UpdateCompanySignerDto) {
    const signer = await this.companySignerRepository.findOne(id);
    if (!signer) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.companySignerRepository.update(id, updateCompanySignerDto);
  }

  async remove(id: number) {
    const signer = await this.companySignerRepository.findOne(id);
    if (!signer) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.companySignerRepository.delete(id);
  }
}
