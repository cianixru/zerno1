import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CompaniesService,
  SignersService,
  BankDetailsService,
  EdmOperatorsService,
} from './services';
import {
  CompaniesController,
  SignersController,
  BankDetailsController,
  EdmOperatorsController,
} from './controllers';
import {
  CompanyRepository,
  CompanySignerRepository,
  CompanyBankDetailsRepository,
  CompanyEdmOperatorRepository,
} from './repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyRepository,
      CompanySignerRepository,
      CompanyBankDetailsRepository,
      CompanyEdmOperatorRepository,
    ]),
  ],
  controllers: [
    CompaniesController,
    SignersController,
    BankDetailsController,
    EdmOperatorsController,
  ],
  providers: [
    CompaniesService,
    SignersService,
    BankDetailsService,
    EdmOperatorsService,
  ],
})
export class CompaniesModule {}
