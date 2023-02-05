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

@Injectable()
export class UserService {
  private users = [];
  constructor() {
    this.users = [];
  }
  getAll(): UserI[] {
    return this.users;
  }
  getUserById(userId): UserI {
    // 400 error
    if (!validate(userId)) throw new BadRequestException('Id is invalid');
    const user = this.users.find(({ id }) => id === userId);
    // 404 error
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  createUser(createUserDto: CreateUserDto): Omit<UserI, 'password'> {
    const newUser = {
      ...createUserDto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    const { password, ...userResponseData } = newUser;
    return userResponseData;
  }

  updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Omit<UserI, 'password'> {
    const userToUpdate = this.getUserById(id);
    // 403
    if (updatePasswordDto.oldPassword !== userToUpdate.password)
      throw new ForbiddenException('Old password is wrong');
    const updatedUser = {
      ...userToUpdate,
      password: updatePasswordDto.newPassword,
      version: userToUpdate.version + 1,
      updatedAt: Date.now(),
    };
    this.users = this.users.map((user) =>
      user.id === id ? updatedUser : user,
    );
    const { password, ...userResponseData } = updatedUser;
    return userResponseData;
  }

  deleteUser(id: string) {
    this.getUserById(id);
    this.users = this.users.filter((user) => user.id !== id);
  }
}
