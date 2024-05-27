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
    console.log(`Validating user with email: ${email}`);
    const user = await this.usersService.findByEmail(email);
    if (user) {
      console.log(`User found. Verifying password...`);
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (isPasswordMatching) {
        console.log(`Password is correct.`);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      } else {
        console.log(`Password is incorrect.`);
      }
    } else {
      console.log(`No user found with email: ${email}`);
    }
    return null;
  }

  async login(user: any) {
    console.log(`Logging in user with email: ${user.email}`);
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
