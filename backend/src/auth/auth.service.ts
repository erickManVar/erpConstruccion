import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    console.log('User retrieved:', user); // Add this line for debugging
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject ? user.toObject() : user; // Ensure mongoose document is converted to plain object
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, name: user.name, role: user.role };
    console.log('JWT Payload:', payload); // For debugging
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
