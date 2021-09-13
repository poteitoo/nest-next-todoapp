import { InputType, PartialType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@InputType()
export class UpdateUserInput extends PartialType(User, InputType) {}
