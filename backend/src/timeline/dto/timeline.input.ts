import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class InputTimeline {
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
