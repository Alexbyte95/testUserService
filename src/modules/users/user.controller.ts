import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from '../../dto/user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserRequest): Promise<any> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<any> {
    return this.userService.getUser({ id });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    if (!updatedUser) {
      return { message: 'user not found' };
    }
    return updatedUser;
  }
}
