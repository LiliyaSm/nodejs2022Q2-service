/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UserI } from './user.interface';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { isPasswordMatchHash } from '../utils/hashUtils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getAll(): Promise<UserI[]> {
    return this.userRepository.find();
  }
  async getUserById(userId): Promise<User> {
    // 400 error
    if (!validate(userId)) throw new BadRequestException('Id is invalid');
    const user = await this.userRepository.findOneBy({ id: userId });
    // 404 error
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserI, 'password'>> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Omit<UserI, 'password'>> {
    const userToUpdate = await this.getUserById(id);
    const isPasswordValid = await isPasswordMatchHash(
      updatePasswordDto.oldPassword,
      userToUpdate.password,
    );
    // 403
    if (!isPasswordValid) throw new ForbiddenException('Old password is wrong');
    userToUpdate.password = updatePasswordDto.newPassword;
    return await this.userRepository.save(userToUpdate);
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    await this.userRepository.remove(user);
  }
}
