import { EntityRepository, Repository } from 'typeorm';
import { CompanySigner } from '../entities';

@EntityRepository(CompanySigner)
export class CompanySignerRepository extends Repository<CompanySigner> {
  findAllByCompanyId(companyId: number) {
    return this.find({ companyId });
  }
}
