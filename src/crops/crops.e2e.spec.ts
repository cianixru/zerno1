import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { Crop } from './entities';
import { TestUtils } from '../utils';

describe('CropsController (e2e)', () => {
  let app: INestApplication;
  let http;
  let token: string;
  let utils: TestUtils;
  let phoneNumber: string;
  let cropRepository: Repository<Crop>;

  type CropType = {
    name: string;
  };

  const crop1: CropType = {
    name: 'Some crop test 1',
  };
  const crop2: CropType = {
    name: 'Some crop test 2',
  };

  const crop1Expected = {
    id: expect.any(Number),
    name: crop1.name,
    parameters: expect.any(Array),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  };

  const crop2Expected = {
    id: expect.any(Number),
    name: crop2.name,
    parameters: expect.any(Array),
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
  });

  afterAll(async () => {
    await utils.logout(phoneNumber);
    await app.close();
  });

  it('should returns all crops', async () => {
    await cropRepository.save([{ ...crop1 }, { ...crop2 }]);
    const { body } = await http
      .get('/crops')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    await Promise.all(
      body.map((crop) => {
        if (crop.name === crop1.name || crop.name === crop2.name) {
          return cropRepository.delete(crop.id);
        }
      }),
    );

    const expected = [crop1Expected, crop2Expected];

    expect(body).toEqual(expect.arrayContaining(expected));
  });

  it('should return crop by id', async () => {
    const crop = await cropRepository.save({ ...crop1 });
    const { body } = await http
      .get(`/crops/${crop.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    await cropRepository.delete(crop.id);

    expect(body).toMatchObject(crop1Expected);
  });

  it('should create crop', async () => {
    const { body } = await http
      .post('/crops')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...crop1 })
      .expect(201);

    await cropRepository.delete(body.id);
    const expected = {
      id: expect.any(Number),
      name: crop1.name,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };
    expect(body).toMatchObject(expected);
  });

  it('should update crop', async () => {
    const crop = await cropRepository.save({ ...crop1 });
    const { body } = await http
      .patch(`/crops/${crop.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(crop2)
      .expect(200);
    const updatedCrop = await cropRepository.findOne(crop.id);
    await cropRepository.delete(crop.id);
    expect(updatedCrop).toMatchObject(crop2);
    expect(body.affected).toEqual(1);
  });

  it('should delete crop', async () => {
    const crop = await cropRepository.save({ ...crop1 });
    const { body } = await http
      .delete(`/crops/${crop.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(body.affected).toEqual(1);
    const deletedCrop = await cropRepository.findOne(crop.id);
    expect(deletedCrop).toEqual(undefined);
  });
});
