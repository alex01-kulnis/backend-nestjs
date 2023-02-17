import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';
import { UserEntity } from './../user/entities/user.entity';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UtilModule } from '../util/util.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: { expiresIn: '24h' },
    }),
    UtilModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  // exports: [JwtModule],
})
export class AuthModule {}
