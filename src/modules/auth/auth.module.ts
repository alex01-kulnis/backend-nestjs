import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UtilModule } from '../util/util.module';

import { RoleService } from '../role/role.service';
import { UtilService } from '../util/util.service';
import { Role } from '../role/entities/role.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: { expiresIn: '24h' },
    }),
    UtilModule,
    UserModule,
    RoleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
