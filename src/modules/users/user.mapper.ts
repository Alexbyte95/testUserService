import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserRequest, GetUserRequest } from '../../dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserMapper {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  toEntity(createUserDto: CreateUserRequest): User {
    const user = new this.userModel(createUserDto); // Usamos el modelo de Mongoose
    return user;
  }

  toDto(user: any): GetUserRequest {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
    };
  }
}
