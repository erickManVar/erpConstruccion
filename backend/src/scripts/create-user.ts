import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const name = 'Admin';
  const email = '123@qwe.com';
  const password = '123qwe';

  await usersService.createUser(name, email, password);
  console.log('User created successfully');
  await app.close();
}

bootstrap();
