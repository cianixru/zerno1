import { EntityRepository, Repository } from 'typeorm';
import { Company } from '../entities';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
  public findOneWithSigner(id: number) {
    return this.manager.findOne(Company, id, {
      relations: ['signers', 'bankDetails', 'edmOperator'],
    });
  }

  public findAllWithSigners() {
    return this.manager.find(Company, {
      relations: ['signers', 'bankDetails', 'edmOperator'],
    });
  }
}
