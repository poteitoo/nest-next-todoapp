import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: DeepPartial<User>): Promise<User> {
    const password = await makeHash(createUserInput.password);
    const user = this.userRepository.create({ ...createUserInput, password });
    return await this.userRepository.save(user);
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async update(user: User, updateUserInput: DeepPartial<User>): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, password, ...content } = updateUserInput;
    const pass = await makeHash(password);
    await this.userRepository.update(user.id, {
      ...content,
      password: password ? pass : user.password,
    });
    return this.findById(user.id);
  }

  async delete(id: string): Promise<boolean> {
    const res = await this.userRepository.delete(id);
    return res.affected > 0;
  }
}

const makeHash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};
