import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS to allow requests from multiple known origins
  app.enableCors({
    origin: [
      'http://localhost:3001', // For your frontend when served by Flutter on a different port
      'http://127.0.0.1:3001', // Alternative local IP representation
      'http://192.168.0.123:3001', // Specific local network IP for mobile device testing
    ],
    methods: 'GET,POST,PUT,DELETE', // HTTP methods allowed
    credentials: true, // Allow the sending of cookies and auth headers
    allowedHeaders: 'Content-Type, Authorization', // Explicitly allow content-type and authorization headers
  });

  await app.listen(3000);
}
bootstrap();
