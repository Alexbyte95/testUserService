import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class RabbitMQService {
  constructor(
    private readonly logger: PinoLogger,
    @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
  ) {}

  sendMessage(pattern: string, message: any) {
    return this.client.send(pattern, message);
  }
  publishUserUpdate(user: any) {
    this.client.emit('user.updated', user);
    this.logger.info('updated user ', user);
  }
}
