import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateCovidInput {
  @Field(() => String)
  gender?: string;

  @Field(() => Number)
  age?: number;

  @Field(() => String)
  occupation?: string;

  @Field(() => [TimelinesInput])
  timelines?: TimelinesInput[];

  @Field(() => [String])
  visited: string[];
}

@InputType()
export class UpdateCovidInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  gender?: string;
  
  @Field(() => Number)
  age?: number;
  
  @Field(() => String)
  occupation?: string;
  
  @Field(() => [TimelinesInput])
  timelines?: TimelinesInput[];

  @Field(() => [String])
  visited: string[];
}

@InputType()
export class TimelinesInput {
  @Field(() => String)
  date?: string;

  @Field(() => [InformationInput])
  information?: InformationInput[];
}

@InputType()
export class InformationInput {
  @Field(() => String)
  time_from?: string;

  @Field(() => String)
  time_to?: string;

  @Field(() => String)
  detail?: string;
  
  @Field(() => String)
  location_type?: string;

  @Field(() => String)
  location_name?: string;
}
