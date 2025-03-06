import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from '../../dto/user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user was created successfully.',
  })
  async createUser(@Body() createUserDto: CreateUserRequest): Promise<any> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'User not found' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUser(@Param('id') id: string): Promise<any> {
    return this.userService.getUser({ id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    if (!updatedUser) {
      return { message: 'user not found' };
    }
    return updatedUser;
  }
}
