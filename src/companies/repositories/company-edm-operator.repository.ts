import { EntityRepository, Repository } from 'typeorm';
import { EdmOperator } from '../entities';

@EntityRepository(EdmOperator)
export class CompanyEdmOperatorRepository extends Repository<EdmOperator> {
  findAllByCompanyId(companyId: number) {
    return this.find({ companyId });
  }
}
