import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanyDTO {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  description: string;
}
