import { Body, Controller, Post } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { AuthUserDto } from './dto/auth-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user-dto/create-user.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('/login')
  // login(@Body() authUserDto: AuthUserDto) {
  //   return this.authService.login(authUserDto);
  // }

  @Post('/registration-user')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }
}
