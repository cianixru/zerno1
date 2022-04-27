import { Connection, QueryRunner } from 'typeorm';

export class TestUtils {
  constructor(private http, private connection: Connection) {}
  private queryRunner: QueryRunner = this.connection.createQueryRunner();

  public async login(phoneNumber) {
    const codeLength = +process.env.SMS_CODE_LENGTH;
    const smsCode = new Array(codeLength + 1).join('0');

    await this.http.post('/auth/setup').send({ phoneNumber });
    const {
      body: { accessToken },
    } = await this.http.post('/auth/login').send({ phoneNumber, smsCode });
    return accessToken;
  }

  public getRandomMobile() {
    return (
      '+7' + Math.floor(Math.random() * (9999999999 - 9000000000) + 9000000000)
    );
  }

  public truncate(...tables) {
    for (const table of tables) {
      return this.queryRunner.query(
        `truncate ${table} restart identity cascade;`,
      );
    }
  }

  public logout(phoneNumber) {
    return this.queryRunner.query(
      `DELETE FROM users WHERE "phoneNumber" = '${phoneNumber}'`,
    );
  }
}
