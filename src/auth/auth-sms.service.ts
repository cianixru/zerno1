import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';

type SendSmsQueryParams = {
  api_id: string;
  from: string;
  to: string;
  msg: string;
  json: 1;
};

type SendSmsResponse = {
  status: 'OK' | 'ERROR';
  sms: object;
};

@Injectable()
export class AuthSmsService {
  private readonly axiosInstance: AxiosInstance;
  constructor(private configService: ConfigService) {
    this.axiosInstance = axios.create({
      method: 'GET',
      baseURL: 'https://sms.ru/sms/send',
    });
  }

  public async send(phoneNumber: string, message: string): Promise<void> {
    const queryParams: SendSmsQueryParams = {
      // eslint-disable-next-line camelcase
      from: 'z-agregator', //TODO: Зарегистрировать отправителя в sms.ru
      api_id: this.configService.get<string>('SMS_RU_API_ID'),
      to: phoneNumber,
      msg: message,
      json: 1,
    };

    const { data } = await this.axiosInstance.request<SendSmsResponse>({
      params: queryParams,
    });
    if (data.status === 'ERROR') {
      // TODO: Create concrete error class
      throw new Error('sms not sent');
    }
    if (data.sms[phoneNumber].status === 'ERROR') {
      const errMsg = data.sms[phoneNumber].status_text;
      throw new Error(errMsg);
    }
  }
}
