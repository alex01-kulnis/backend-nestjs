import { Declaration } from './modules/declaration/entities/declaration.entity';
import { Category } from './modules/category/entities/category.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UtilModule } from './modules/util/util.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SectionModule } from './modules/section/section.module';
import { RegionModule } from './modules/region/region.module';
import { RoleModule } from './modules/role/role.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { DeclarationModule } from './modules/declaration/declaration.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        // entities: [Category, Declaration],
        synchronize: false,
        autoLoadEntities: true,
        logging: false,
      }),
    }),
    UtilModule,
    AuthModule,
    UserModule,
    SectionModule,
    RegionModule,
    RoleModule,
    OrganizationModule,
    DeclarationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
