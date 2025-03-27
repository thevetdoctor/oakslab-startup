import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePhaseDTO {
  @Field()
  title: string;

  @Field()
  order: number;

  @Field()
  description: string;
}
