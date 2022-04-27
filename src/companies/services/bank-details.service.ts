import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBankDetailsDto, UpdateBankDetailsDto } from '../dto';
import {
  CompanyRepository,
  CompanyBankDetailsRepository,
} from '../repositories';

@Injectable()
export class BankDetailsService {
  constructor(
    private companyRepository: CompanyRepository,
    private companyBankDetailsRepository: CompanyBankDetailsRepository,
  ) {}

  async findAllByCompanyId(companyId: number) {
    const company = await this.companyRepository.findOne(companyId);
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    return this.companyBankDetailsRepository.findAllByCompanyId(companyId);
  }

  findOne(signerId: number) {
    return this.companyBankDetailsRepository.findOne(signerId);
  }

  async create(companyId: number, createBankDetailsDto: CreateBankDetailsDto) {
    const company = await this.companyRepository.findOne(companyId);
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    return this.companyBankDetailsRepository.save({
      companyId,
      ...createBankDetailsDto,
    });
  }

  async update(id: number, updateBankDetailsDto: UpdateBankDetailsDto) {
    const signer = await this.companyBankDetailsRepository.findOne(id);
    if (!signer) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.companyBankDetailsRepository.update(id, updateBankDetailsDto);
  }

  async remove(id: number) {
    const signer = await this.companyBankDetailsRepository.findOne(id);
    if (!signer) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.companyBankDetailsRepository.delete(id);
  }
}
