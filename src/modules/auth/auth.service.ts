import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UtilService } from './../util/util.service';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { AuthUserDto } from './dto/auth.user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserFieldsNameEnum } from './enums/user-fields-name.enum';
import { UserRoleEnum } from './enums/user-role.enum';
import { StatusUser } from '../user/enum/status-users.enum';
import statusCodes from './error/statusCodes';

@Injectable()
export class AuthService {
  constructor(
    private utilService: UtilService,
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  async loginByUser(authUserDto: AuthUserDto) {
    const user = await this.validateUser(authUserDto);
    // return this.generateToken(user);
  }

  private async validateUser(authUserDto: AuthUserDto) {
    const user: AuthUserDto = await this.userService.findUserByField(
      UserFieldsNameEnum.LOGIN,
      authUserDto.login,
    );

    if (!user)
      throw new UnauthorizedException({
        message: `Такого пользователя не существует`,
      });

    const passwordEquals =
      this.utilService.hashString(authUserDto.password) !== user.login;

    if (passwordEquals) {
      throw new UnauthorizedException({
        message: `Пароль введен неверно`,
      });
    }
    return user;
  }

  async registrationByUser(createUserDto: CreateUserDto) {
    if (
      !createUserDto.login ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new HttpException(statusCodes.EMPTY_FIELD, HttpStatus.BAD_REQUEST);
    }

    const login = await this.userService.findUserByField(
      UserFieldsNameEnum.LOGIN,
      createUserDto.login,
    );

    if (login) {
      throw new HttpException(
        statusCodes.USER_ALREADY_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    const email = await this.userService.findUserByField(
      UserFieldsNameEnum.EMAIL,
      createUserDto.email,
    );

    if (email)
      throw new HttpException(
        statusCodes.USER_ALREADY_EXIST,
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = this.utilService.hashString(createUserDto.password);
    createUserDto.password = hashPassword;
    createUserDto.role = await this.roleService.setRole(UserRoleEnum.USER);

    const user = this.userService.createUser(createUserDto);
    return user;
  }

  async registrationByOrg(createUserDto: CreateUserDto) {
    if (
      !createUserDto.login ||
      !createUserDto.first_name ||
      !createUserDto.middle_name ||
      !createUserDto.organization_name ||
      !createUserDto.last_name ||
      !createUserDto.phone ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new HttpException(statusCodes.EMPTY_FIELD, HttpStatus.BAD_REQUEST);
    }

    const login = await this.userService.findUserByField(
      UserFieldsNameEnum.LOGIN,
      createUserDto.login,
    );

    if (login) {
      throw new HttpException(
        `Пользователь с логином ${createUserDto.login} уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const email = await this.userService.findUserByField(
      UserFieldsNameEnum.EMAIL,
      createUserDto.email,
    );

    if (email)
      throw new HttpException(
        `Пользователь с почтой ${createUserDto.email} уже существует`,
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = this.utilService.hashString(createUserDto.password);
    createUserDto.password = hashPassword;
    createUserDto.role = await this.roleService.setRole(
      UserRoleEnum.ORGANIZATION,
    );
    createUserDto.status = StatusUser.INACTIVE;

    const user = this.userService.createUser(createUserDto);
    return user;
  }

  // async generateToken(user: UserModel) {
  //   const payload = {
  //     id_user: user.id_user,
  //     firstname: user.firstname,
  //     secondname: user.secondname,
  //   };
  //   return {
  //     token: this.jwtService.sign(payload),
  //   };
  // }
}
