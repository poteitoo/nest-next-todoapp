import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 'wdg',
      username: 'cat',
      password: 'momo',
    },
    {
      id: 'ewr',
      username: 'dog',
      password: 'momo',
    },
  ];
  create(createUserInput: CreateUserInput) {
    return this.users[0];
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  findByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.users.find((user) => user.id === id);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
