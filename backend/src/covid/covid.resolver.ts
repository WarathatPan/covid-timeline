import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Covid } from './covid.model';
import { CovidService } from './covid.service';
import {
  CreateCovidInput,
  UpdateCovidInput,
} from './covid.inputs';

@Resolver(() => Covid)
export class CovidResolver {
  constructor(private covidService: CovidService) {}

  @Query(() => Covid)
  async covid(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.covidService.getById(_id);
  }

  @Mutation(() => Covid)
  async createCovid(@Args('payload') payload: CreateCovidInput) {
    return this.covidService.create(payload);
  }

  @Mutation(() => Covid)
  async updateCovid(@Args('payload') payload: UpdateCovidInput) {
    return this.covidService.update(payload);
  }

  @Mutation(() => Covid)
  async deleteCovid(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.covidService.delete(_id);
  }
}