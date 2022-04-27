import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CropParameter } from './entities';
import { Crop } from '../crops/entities';
import { TestUtils } from '../utils';

describe('CropsParametersController (e2e)', () => {
  let app: INestApplication;
  let http;
  let token: string;
  let utils: TestUtils;
  let phoneNumber: string;
  let cropRepository: Repository<Crop>;
  let cropParameterRepository: Repository<CropParameter>;
  let crop: Crop;

  type CropType = {
    name: string;
  };

  const crop1: CropType = {
    name: 'Some crop for test crop parameters  1',
  };

  type CropParameterType = {
    cropId: number;
    name: string;
    value: string;
  };

  const cropParameter1: CropParameterType = {
    cropId: 1,
    name: 'Some crop parameter test 1',
    value: 'Some crop value test 1',
  };
  const cropParameter2: CropParameterType = {
    cropId: 1,
    name: 'Some crop parameter test 2',
    value: 'Some crop value test 2',
  };

  const cropParameter1Expected = {
    id: expect.any(Number),
    name: cropParameter1.name,
    value: cropParameter1.value,
    cropId: cropParameter1.cropId,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  };

  const cropParameter2Expected = {
    id: expect.any(Number),
    name: cropParameter2.name,
    value: cropParameter2.value,
    cropId: cropParameter1.cropId,
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

    cropRepository = connection.manager.getRepository(Crop);
    cropParameterRepository = connection.manager.getRepository(CropParameter);

    crop = await cropRepository.save({ ...crop1 });
    cropParameter1.cropId = crop.id;
    cropParameter2.cropId = crop.id;
    cropParameter1Expected.cropId = crop.id;
    cropParameter2Expected.cropId = crop.id;
  });

  afterAll(async () => {
    await utils.logout(phoneNumber);
    await cropRepository.delete(crop.id);
    await app.close();
  });

  it('should returns all crops', async () => {
    await cropParameterRepository.save([
      { ...cropParameter1 },
      { ...cropParameter2 },
    ]);
    const { body } = await http
      .get('/crop-parameters')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    await Promise.all(
      body.map((cropParameter) => {
        if (
          cropParameter.name === cropParameter1.name ||
          cropParameter.name === cropParameter2.name
        ) {
          return cropParameterRepository.delete(cropParameter.id);
        }
      }),
    );
    const expected = [cropParameter1Expected, cropParameter2Expected];

    expect(body).toEqual(expect.arrayContaining(expected));
  });

  it('should return crop by id', async () => {
    const cropParameter = await cropParameterRepository.save({
      ...cropParameter1,
    });
    const { body } = await http
      .get(`/crop-parameters/${cropParameter.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    await cropParameterRepository.delete(cropParameter.id);

    expect(body).toMatchObject(cropParameter1Expected);
  });

  it('should create crop', async () => {
    const { body } = await http
      .post('/crop-parameters')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...cropParameter1 })
      .expect(201);

    await cropParameterRepository.delete(body.id);
    const expected = {
      id: expect.any(Number),
      name: cropParameter1.name,
      value: cropParameter1.value,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };
    expect(body).toMatchObject(expected);
  });

  it('should update crop', async () => {
    const cropParameter = await cropParameterRepository.save({
      ...cropParameter1,
    });
    const { body } = await http
      .patch(`/crop-parameters/${cropParameter.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(cropParameter2)
      .expect(200);
    const updatedCropParameter = await cropParameterRepository.findOne(
      cropParameter.id,
    );
    await cropParameterRepository.delete(cropParameter.id);
    expect(updatedCropParameter).toMatchObject(cropParameter2);
    expect(body.affected).toEqual(1);
  });

  it('should delete crop', async () => {
    const cropParameter = await cropParameterRepository.save({
      ...cropParameter1,
    });
    const { body } = await http
      .delete(`/crop-parameters/${cropParameter.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(body.affected).toEqual(1);
    const deletedCropParameter = await cropParameterRepository.findOne(
      cropParameter.id,
    );
    expect(deletedCropParameter).toEqual(undefined);
  });
});
