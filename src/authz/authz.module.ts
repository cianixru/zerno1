import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { UserRepository } from '../users/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthzService } from './authz.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [CaslAbilityFactory, AuthzService],
  exports: [CaslAbilityFactory],
})
export class AuthzModule {}
