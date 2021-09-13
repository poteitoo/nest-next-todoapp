import { InputType, PickType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@InputType()
export class DeleteUserInput extends PickType(
  User,
  ['id', 'password'] as const,
  InputType,
) {}
