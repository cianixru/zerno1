import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { User } from './entities';
import { TestUtils } from '../utils';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let http;
  let token: string;
  let utils: TestUtils;
  let phoneNumber: string;
  let userRepository: Repository<User>;

  type UserType = {
    phoneNumber: string;
    name: string;
    patronymic: string;
    surname: string;
    email: string;
    avatar: string | null;
  };

  let user1: UserType;
  let user1Expected;

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

    user1 = {
      phoneNumber: utils.getRandomMobile(),
      name: 'Some user name test 1',
      patronymic: 'Some user patronimic test 1',
      surname: 'Some user surname test 1',
      email: 'testuser1@example.com',
      avatar: null,
    };

    user1Expected = {
      id: expect.any(Number),
      phoneNumber: user1.phoneNumber,
      name: user1.name,
      patronymic: user1.patronymic,
      surname: user1.surname,
      email: user1.email,
      avatar: user1.avatar,
      companyId: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };

    userRepository = connection.manager.getRepository(User);
  });

  afterAll(async () => {
    await utils.logout(phoneNumber);
    await app.close();
  });

  // it('should returns all users', async () => {
  //   await userRepository.save({ ...user1 });
  //   const { body } = await http
  //     .get('/users')
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(200);

  //   await Promise.all(
  //     body.map((user) => {
  //       if (user.name === user1.name) {
  //         return userRepository.delete(user.id);
  //       }
  //     }),
  //   );

  //   const expected = [{ ...user1Expected, ...{ secret: null } }]; //TODO: secret убрать
  //   expect(body).toEqual(expect.arrayContaining(expected));
  // });

  // it('should return user by id', async () => {
  //   const user = await userRepository.save({ ...user1 });
  //   const { body } = await http
  //     .get(`/users/${user.id}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(200);

  //   await userRepository.delete(user.id);
  //   expect(body).toMatchObject(user1Expected);
  // });

  it('should create user', async () => {
    const { body } = await http
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...user1 })
      .expect(201);

    await userRepository.delete(body.id);
    const expected = {
      id: expect.any(Number),
      name: user1.name,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };
    expect(body).toMatchObject(expected);
  });

  // it('should update user', async () => {
  //   const user = await userRepository.save({ ...user1 });
  //   const { body } = await http
  //     .patch(`/users/${user.id}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({ name: 'updated user name' })
  //     .expect(200);
  //   const updatedUser = await userRepository.findOne(user.id);
  //   await userRepository.delete(user.id);
  //   expect(updatedUser).toMatchObject({ name: 'updated user name' });
  //   expect(body.affected).toEqual(1);
  // });

  // it('should delete user', async () => {
  //   const user = await userRepository.save({ ...user1 });
  //   const { body } = await http
  //     .delete(`/users/${user.id}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(200);
  //   expect(body.affected).toEqual(1);
  //   const deletedUser = await userRepository.findOne(user.id);
  //   expect(deletedUser).toEqual(undefined);
  // });
  //TODO: исправить тесты и раскомментировать
});
