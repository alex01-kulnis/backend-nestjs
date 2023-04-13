import { IsOptional } from 'class-validator';

import { Role } from 'src/modules/role/entities/role.entity';
import { StatusUser } from '../enum/status-users.enum';

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

  @IsOptional()
  status: StatusUser;

  email: string;
  login: string;
  password: string;
  role: Role;
}
