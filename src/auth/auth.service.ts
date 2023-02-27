import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { isPasswordMatchHash } from '../utils/hashUtils';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { verify, JwtPayload } from 'jsonwebtoken';

dotenv.config();

export interface JWTPayload {
  userId: string;
  login: string;
}

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(user: CreateUserDto): Promise<any> {
    return await this.userService.createUser(user);
  }

  async login({ login, password }: LoginDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { login },
    });
    // 403 error
    if (!user) throw new ForbiddenException('User not found');
    const isPasswordValid = await isPasswordMatchHash(password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Password is not correct');
    }
    return this.generateTokens(user.id, user.login);
  }

  async refresh({ refreshToken }: RefreshTokenDto): Promise<any> {
    if (!refreshToken)
      throw new UnauthorizedException(
        'Dto is invalid (no refreshToken in body)',
      );
    try {
      const { userId, login } = verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH_KEY,
      ) as JwtPayload;
      return this.generateTokens(userId, login);
    } catch {
      throw new ForbiddenException('Refresh token is invalid');
    }
  }

  private generateTokens(userId: string, login: string) {
    const payload: JWTPayload = {
      userId,
      login,
    };

    const accessToken = sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = sign(payload, process.env.JWT_SECRET_REFRESH_KEY, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
