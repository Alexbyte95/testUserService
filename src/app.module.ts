import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices'; // Usar ClientsModule
import { join } from 'path';
import { UserModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from './rabbitmq/rabbit.module';
import { LoggerModule } from 'nestjs-pino';
import { UserService } from './modules/users/user.service';
import { UserController } from './modules/users/user.controller';

@Module({
  imports: [
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
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    UserModule,
    RabbitMQModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
