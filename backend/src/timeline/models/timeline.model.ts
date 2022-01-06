import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Timeline {
  @Field((type) => ID)
  id: string;

  @Field((type) => String, { nullable: true })
  gender?: string;

  @Field((type) => Number, { nullable: true })
  age?: number;

  @Field((type) => String, { nullable: true })
  occupation?: string;

  @Field((type) => String, { nullable: true })
  time_from?: string;

  @Field((type) => String, { nullable: true })
  time_to?: string;

  @Field((type) => String, { nullable: true })
  detail?: string;

  @Field((type) => String, { nullable: true })
  location_type?: string;

  @Field((type) => String, { nullable: true })
  location_name?: string;
}
