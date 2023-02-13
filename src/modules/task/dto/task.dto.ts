import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateTaskDTO{
    @Field()
    title: string;

    @Field()
    order: number;

    @Field()
    description: string;

    @Field()
    phaseId: string
}


@InputType()
export class DoTaskDTO{
    @Field()
    companyId: string;

    @Field()
    taskId: string
}