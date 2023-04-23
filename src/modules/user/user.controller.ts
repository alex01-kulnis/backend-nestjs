import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guadrs/jsw.auth.guard';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(+id, updateUserDto);
  }

  @Get('/inactive')
  findInactiveUsers() {
    return this.userService.findInactiveUsers();
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  findUserById(@Request() req: any) {
    const tokenData = req.user;
    return this.userService.findUserById(tokenData.id_user);
  }

  @Get('/section-by-org')
  @UseGuards(JwtAuthGuard)
  findSectionsByOrg(@Request() req: any) {
    const tokenData = req.user;
    return this.userService.findSectionsByOrg(+tokenData.id_user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  patchByAuthUser(@Request() req: any, @Body() updateUserDto: any) {
    const tokenData = req.user;
    return this.userService.patch(+tokenData.id_user, updateUserDto);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.patch(+id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  cascadeDeleteUser(@Request() req: any) {
    const tokenData = req.user;
    return this.userService.delete(+tokenData.id_user);
  }
}
