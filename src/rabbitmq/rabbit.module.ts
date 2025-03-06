import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbit.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'user.updated',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [RabbitMQService],
  exports: [ClientsModule, RabbitMQService], // Exporta ClientsModule para que otros módulos lo puedan usar
})
export class RabbitMQModule {}
