import { IsOptional } from 'class-validator';

import { Role } from 'src/modules/role/entities/role.entity';

export class CreateUserDto {
  @IsOptional()
  organization_name: string;

  @IsOptional()
  first_name: string;

  @IsOptional()
  middle_name: string;

  @IsOptional()
  patronymic: string;

  @IsOptional()
  phone: string;

  email: string;
  login: string;
  password: string;
  role: Role;
}
