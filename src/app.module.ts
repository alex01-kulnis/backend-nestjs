import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UtilsModule } from './modules/utils/utils.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    // TypeOrmModule.forRootAsync({
    //   // imports: [ConfigModule],
    //   // inject: [ConfigService],
    //   // useFactory: async (config: ConfigService) => ({
    //   //   type: config.get<'auroro-data-api'>('TYPEORM_CONNECTION'),
    //   //   username: config.get<string>('TYPEORM_USERNAME'),
    //   //   password: config.get<string>('TYPEORM_PASSWORD'),
    //   //   database: config.get<string>('TYPEORM_DATABASE'),
    //   //   port: config.get<number>('TYPEORM_PORT'),
    //   //   entities: [__dirname + 'dist/**/*.entity{.ts,.js'],
    //   //   synchronize: true,
    //   //   autoLoadEntities: true,
    //   //   logging: true,
    //   // }),
    //   // useFactory: async (config: ConfigService) => ({
    //   //   type: config.get<'auroro-data-api'>('TYPEORM_CONNECTION'),
    //   // }),
    // }),
    UtilsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
