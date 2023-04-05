import { Body, Controller, Post } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { AuthUserDto } from './dto/auth-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('/login')
  // login(@Body() authUserDto: AuthUserDto) {
  //   return this.authService.login(authUserDto);
  // }

  @Post('/user/register')
  registrationUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registrationByUser(createUserDto);
  }

  @Post('/org/register')
  registrationOrg(@Body() createUserDto: CreateUserDto) {
    return this.authService.registrationByOrg(createUserDto);
  }
}
