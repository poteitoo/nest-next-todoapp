import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@InputType()
export class CreateUserInput extends PartialType(
  OmitType(User, ['id'] as const),
  InputType,
) {
  @Field()
  username: string;

  @Field()
  password: string;
}
