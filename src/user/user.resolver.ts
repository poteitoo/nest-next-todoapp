import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => User, { name: 'user' })
  findByUsername(@Args('id', { type: () => String }) id: string) {
    return this.userService.findByUsername(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateUser(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(user, updateUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  removeUser(@CurrentUser() user: User) {
    return this.userService.delete(user.id);
  }
}
