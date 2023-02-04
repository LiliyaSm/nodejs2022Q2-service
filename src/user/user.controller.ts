import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  // @Get(':id')
  // getOne(@Param('id') id: string): string {
  //   return 'getOne' + id;
  // }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto): string {
  //   return `${createUserDto}`;
  // }
}
