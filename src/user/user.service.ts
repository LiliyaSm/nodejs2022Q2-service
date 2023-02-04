import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [];
  constructor() {
    this.users = [];
  }
  getAll(): any[] {
    return this.users;
  }
}
