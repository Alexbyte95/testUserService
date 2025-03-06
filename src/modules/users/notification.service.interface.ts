import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC, // Especifica que se usará gRPC
  options: {
    url: '0.0.0.0:50051', // Dirección y puerto del servidor gRPC
    package: 'notification', // Nombre del paquete definido en el archivo .proto
    protoPath: join(process.cwd(), 'proto/notification.proto'),
  },
};
