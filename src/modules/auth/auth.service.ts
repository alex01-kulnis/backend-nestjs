import { UtilService } from './../util/util.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthUserDto } from './dto/auth.user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserFieldsName } from './enums/user-fields.name';
// import { UtilsService } from '../util/util.service';
// import { AuthUserDto } from './dto/auth-user.dto';
// import { CreateUserDto } from './dto/create-user.dto';
// import { DatabaseService } from '../database/Database.service';

@Injectable()
export class AuthService {
  constructor(
    private utilService: UtilService,
    private userService: UserService,
  ) {}

  async loginByUser(authUserDto: AuthUserDto) {
    const user = await this.validateUser(authUserDto);
    // return this.generateToken(user);
  }

  private async validateUser(authUserDto: AuthUserDto) {
    const user: any = await this.userService.findUserByField(
      UserFieldsName.LOGIN,
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
    const login = await this.userService.findUserByField(
      UserFieldsName.LOGIN,
      createUserDto.login,
    );

    if (login) {
      throw new HttpException(
        `Пользователь с логином ${createUserDto.login} уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const email = await this.userService.findUserByField(
      UserFieldsName.EMAIL,
      createUserDto.email,
    );

    if (email)
      throw new HttpException(
        `Пользователь с почтой ${createUserDto.email} уже существует`,
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = this.utilService.hashString(createUserDto.password);
    createUserDto.password = hashPassword;
    const user = this.userService.createUser(createUserDto);
    return user;
  }

  async registrationByOrg(createUserDto: CreateUserDto) {
    const login = await this.userService.findUserByField(
      'login',
      createUserDto.login,
    );

    if (login.length !== 0) {
      throw new HttpException(
        `Пользователь с логином ${createUserDto.login} уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const email = await this.userService.findUserByField(
      'email',
      createUserDto.email,
    );

    if (email.length !== 0)
      throw new HttpException(
        `Пользователь с почтой ${createUserDto.email} уже существует`,
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = this.utilService.hashString(createUserDto.password);
    createUserDto.password = hashPassword;
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
