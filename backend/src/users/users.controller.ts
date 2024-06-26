import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto.name, createUserDto.email, createUserDto.password, createUserDto.role);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
