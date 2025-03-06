/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Injectable,
  OnModuleInit,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { UserRepository } from './user.repository';
import { CreateUserRequest } from './../../dto/user.dto';
import { UserMapper } from './user.mapper';
import { PinoLogger } from 'nestjs-pino';
import { RabbitMQService } from 'src/rabbitmq/rabbit.service';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { grpcClientOptions } from './notification.service.interface';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly logger: PinoLogger,
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
    private readonly rabbitMQService: RabbitMQService,
  ) {}
  @Client(grpcClientOptions)
  private client: ClientGrpc;

  private notificationService: any;

  onModuleInit() {
    this.notificationService = this.client.getService('NotificationService');
  }

  async createUser(createUserDto: CreateUserRequest): Promise<any> {
    try {
      const user = this.userMapper.toEntity(createUserDto);
      const savedUser = await this.userRepository.save(user);

      this.logger.info('User created successfully.');

      this.sendNotification(user);

      return this.userMapper.toDto(savedUser);
    } catch (error) {
      this.logger.error('Error creating user:', error);
      throw new InternalServerErrorException('Error creating user.', error);
    }
  }

  async getUser(getUserDto: any): Promise<any> {
    try {
      const user = await this.userRepository.findById(getUserDto.id);

      if (!user) {
        this.logger.warn(`User with id ${getUserDto.id} not found.`);
        throw new NotFoundException(`User with id ${getUserDto.id} not found.`);
      }

      this.logger.info('User retrieved successfully.');
      return this.userMapper.toDto(user);
    } catch (error) {
      this.logger.error('Error retrieving user:', error);
      throw new InternalServerErrorException('Error retrieving user.');
    }
  }

  async updateUser(id: string, updateData: UpdateUserDto) {
    try {
      const updatedUser = await this.userRepository.updateUser(id, updateData);

      if (!updatedUser) {
        this.logger.warn(`User with id ${id} not found for update.`);
        throw new NotFoundException(`User with id ${id} not found.`);
      }

      this.rabbitMQService.publishUserUpdate(updatedUser);
      this.logger.info('User updated successfully.');
      return updatedUser;
    } catch (error) {
      this.logger.error('Error updating user:', error);
      throw new InternalServerErrorException('Error updating user.');
    }
  }

  sendNotification(user: any) {
    try {
      this.notificationService
        .sendNotification({
          name: user.name,
          email: user.email,
        })
        .subscribe((res) => {
          this.logger.info(res);
        });
      this.logger.info('Notification sent successfully.');
    } catch (error) {
      this.logger.error('Error sending notification:', error);
      throw new InternalServerErrorException('Error sending notification.');
    }
  }
}
