import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async save(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findById(id: string): Promise<any> {
    return this.userModel.findById(id).exec();
  }
  async updateUser(id: string, updateData: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }
}
