import { EntityRepository, Repository } from 'typeorm';
import { BankDetails } from '../entities';

@EntityRepository(BankDetails)
export class CompanyBankDetailsRepository extends Repository<BankDetails> {
  findAllByCompanyId(companyId: number) {
    return this.find({ companyId });
  }
}
