import { IsOptional } from 'class-validator';

import { Role } from 'src/modules/role/entities/role.entity';
import { StatusUser } from '../enum/status-users.enum';

export class UpdateUserDto {
  @IsOptional()
  organization_name: string;

  @IsOptional()
  first_name: string;

  @IsOptional()
  middle_name: string;

  @IsOptional()
  last_name: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  status: StatusUser;

  @IsOptional()
  email: string;

  @IsOptional()
  login: string;

  @IsOptional()
  password: string;

  @IsOptional()
  role: Role;
}
