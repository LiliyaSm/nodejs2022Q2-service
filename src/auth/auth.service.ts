import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  constructor(private userService: UserService) {}
  async signup(user: CreateUserDto): Promise<any> {
    return await this.userService.createUser(user);
  }
  async login({ login, password }: LoginDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { login },
    });
    // 403 error
    if (!user) throw new ForbiddenException('User not found');
    if (password !== user.password) {
      throw new ForbiddenException('Password is not correct');
    }
  }
  async refresh(): Promise<any> {
    return null;
  }
}
