import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Covid {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop()
  gender: string;

  @Field(() => Number)
  @Prop()
  age: number;

  @Field(() => String)
  @Prop()
  occupation: string;

  @Field(() => [Timelines])
  @Prop()
  timelines: Timelines[];

  @Field(() => [String])
  @Prop()
  visited: string[];
}

@ObjectType()
@Schema()
export class Timelines {
  @Field(() => String)
  @Prop()
  date: string;

  @Field(() => [Information])
  @Prop()
  information: Information[];
}

@ObjectType()
@Schema()
export class Information {
  @Field(() => String)
  @Prop()
  time_from: string;

  @Field(() => String)
  @Prop()
  time_to: string;

  @Field(() => String)
  @Prop()
  detail: string;
  
  @Field(() => String)
  @Prop()
  location_type: string;

  @Field(() => String)
  @Prop()
  location_name: string;
}

export type CovidDocument = Covid & Document;
export type TimelinesDocument = Timelines & Document;
export type InformationDocument = Information & Document;

export const CovidSchema = SchemaFactory.createForClass(Covid);
export const TimelinesSchema = SchemaFactory.createForClass(Timelines);
export const InformationSchema = SchemaFactory.createForClass(Information);