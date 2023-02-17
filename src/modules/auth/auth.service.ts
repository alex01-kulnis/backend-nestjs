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

  async login(authUserDto: AuthUserDto) {
    // const user = await this.validateUser(authUserDto);
    // return this.generateToken(user);
  }

  private async validateUser(authUserDto: AuthUserDto) {
    const user = await this.userService.findUser(authUserDto.login);

    if (!user)
      throw new UnauthorizedException({
        message: `Такого пользователя не существует`,
      });

    // const passwordEquals =
    //   this.utilService.hashString(authUserDto.password) !== user.login;

    // if (passwordEquals) {
    //   throw new UnauthorizedException({
    //     message: `Пароль введен неверно`,
    //   });
    // }
    return user;
  }

  // async registration(createUserDto: CreateUserDto) {
  //   let candidate = await this.userService.findUser(createUserDto.login);
  //   if (candidate)
  //     throw new HttpException(
  //       `Пользователь с логином ${createUserDto.login} уже существует`,
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   const hashPassword = this.utilsService.hashString(createUserDto.password);
  //   await this.dbContext
  //     .query('CALL insert_user($1, $2, $3, $4)', [
  //       createUserDto.firstname,
  //       createUserDto.secondname,
  //       createUserDto.login,
  //       hashPassword,
  //     ])
  //     .then(async () => {
  //       candidate = await this.userService.findUser(createUserDto.login);
  //     })
  //     .catch((err) => {
  //       throw new InternalServerErrorException(err);
  //     });

  //   return this.generateToken(candidate);
  // }

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
