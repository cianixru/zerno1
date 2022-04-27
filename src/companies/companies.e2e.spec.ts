import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { Company, CompanySigner, BankDetails, EdmOperator } from './entities';
import { TestUtils } from '../utils';

describe('CompaniesController (e2e)', () => {
  let app: INestApplication;
  let http;
  let token: string;
  let utils: TestUtils;
  let phoneNumber: string;
  let companyRepository;
  let signerRepository;
  let bankDetailsRepository;
  let edmOperatorRepository;

  const company1 = {
    name: 'Some company name test 1',
    roleTypeId: 'grower',
    inn: '1234567890',
    kpp: '1234567890',
    okved: '62.11',
    okveds: ['62.12', '63.12'],
    address: 'Some address test 1',
    nds: true,
  };
  const company2 = {
    name: 'Some company name test 2',
    roleTypeId: 'grower',
    inn: '1234567891',
    kpp: '1234567891',
    okved: '64.11',
    okveds: ['64.12', '65.12'],
    address: 'Some address test 2',
    nds: false,
  };

  const signer1 = {
    name: 'Ivan',
    patronymic: 'Ivanovich',
    surname: 'Ivanov',
  };

  const signer2 = {
    name: 'Petr',
    patronymic: 'Petrovich',
    surname: 'Petrov',
  };

  const bankDetails1 = {
    name: 'Some bank 1',
    paymentAccount: '123456789',
    correspondentAccount: '123456789',
    bic: '123567',
  };

  const bankDetails2 = {
    name: 'Some bank 2',
    paymentAccount: '987654321',
    correspondentAccount: '987654321',
    bic: '7654321',
  };

  const edmOperator1 = {
    name: 'Some operator 1',
    edmId: 'Some operator id 1',
  };

  const edmOperator2 = {
    name: 'Some operator 2',
    edmId: 'Some operator id 2',
  };

  const company1Expected = {
    id: expect.any(Number),
    ...company1,
    signers: [
      {
        ...signer1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ],
    bankDetails: [
      {
        ...bankDetails1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ],
    edmOperator: [
      {
        ...edmOperator1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ],
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  };

  const company2Expected = {
    id: expect.any(Number),
    ...company2,

    signers: [
      {
        ...signer2,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ],
    bankDetails: [
      {
        ...bankDetails2,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ],
    edmOperator: [
      {
        ...edmOperator2,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ],
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    http = request(app.getHttpServer());

    const connection: Connection = app.get(Connection);
    utils = new TestUtils(http, connection);
    phoneNumber = utils.getRandomMobile();
    token = await utils.login(phoneNumber);

    companyRepository = connection.manager.getRepository(Company);
    signerRepository = connection.manager.getRepository(CompanySigner);
    bankDetailsRepository = connection.manager.getRepository(BankDetails);
    edmOperatorRepository = connection.manager.getRepository(EdmOperator);
  });
  afterAll(async () => {
    await utils.logout(phoneNumber);
    await app.close();
  });

  it('should returns all companies', async () => {
    const [newCompany1, newCompany2] = await companyRepository.save([
      { ...company1 },
      { ...company2 },
    ]);
    await signerRepository.save([
      { ...signer1, companyId: newCompany1.id },
      { ...signer2, companyId: newCompany2.id },
    ]);
    await bankDetailsRepository.save([
      { ...bankDetails1, companyId: newCompany1.id },
      { ...bankDetails2, companyId: newCompany2.id },
    ]);
    await edmOperatorRepository.save([
      { ...edmOperator1, companyId: newCompany1.id },
      { ...edmOperator2, companyId: newCompany2.id },
    ]);

    const { body } = await http
      .get('/companies')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    await Promise.all(
      body.map((company) => {
        if (company.name === company1.name || company.name === company2.name) {
          return companyRepository.delete(company.id);
        }
      }),
    );
    await Promise.all([
      companyRepository.delete(newCompany1.id),
      companyRepository.delete(newCompany2.id),
    ]);
    const expected = [{ ...company1Expected }, { ...company2Expected }];
    const filteredBody = body.filter(
      (company) =>
        company.id === newCompany1.id || company.id === newCompany2.id,
    );
    expect(filteredBody).toMatchObject(expected);
  });

  it('should return company by id', async () => {
    const company = await companyRepository.save({ ...company1 });
    await signerRepository.save({ ...signer1, companyId: company.id });
    await bankDetailsRepository.save({
      ...bankDetails1,
      companyId: company.id,
    });
    await edmOperatorRepository.save({
      ...edmOperator1,
      companyId: company.id,
    });
    const { body } = await http
      .get(`/companies/${company.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    await companyRepository.delete(company.id);

    expect(body).toMatchObject(company1Expected);
  });

  it('should create company', async () => {
    const { body } = await http
      .post('/companies')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...company1 })
      .expect(201);

    await companyRepository.delete(body.id);

    const expected = {
      id: expect.any(Number),
      name: company1.name,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };
    expect(body).toMatchObject(expected);
  });

  it('should update company', async () => {
    const company = await companyRepository.save({ ...company1 });
    const { body } = await http
      .patch(`/companies/${company.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(company2)
      .expect(200);
    const updatedCompany = await companyRepository.findOne(company.id);
    await companyRepository.delete(company.id);

    expect(updatedCompany).toMatchObject(company2);
    expect(body.affected).toEqual(1);
  });

  it('should delete company', async () => {
    const company = await companyRepository.save({ ...company1 });
    const { body } = await http
      .delete(`/companies/${company.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(body.affected).toEqual(1);
    const deletedCompany = await companyRepository.findOne(company.id);
    expect(deletedCompany).toEqual(undefined);
  });
});
