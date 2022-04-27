import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig, serverConfig } from './config';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CropsModule } from './crops/crops.module';
import { CropParametersModule } from './crop-parameters/crop-parameters.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthzModule } from './authz/authz.module';
import { WarehousesModule } from './warehouses/warehouses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, serverConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        synchronize: false,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './files',
    }),
    CompaniesModule,
    AuthModule,
    UsersModule,
    CropsModule,
    CropParametersModule,
    AuthzModule,
    WarehousesModule,
  ],
  controllers: [],
  providers: [AuthzModule],
  exports: [AuthzModule],
})
export class AppModule {}
