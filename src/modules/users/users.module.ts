/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './user.schema';
import { UserMapper } from './user.mapper';
import { RabbitMQModule } from 'src/rabbitmq/rabbit.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RabbitMQModule,
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'notification',
          protoPath: join(process.cwd(), 'proto/notification.proto'),
        },
      },
    ]),
  ],
  providers: [UserService, UserRepository, UserMapper],
  controllers: [UserController],
  exports: [UserService, UserRepository, UserMapper],
})
export class UserModule {}
