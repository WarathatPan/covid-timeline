import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Timeline } from './models/timeline.model';
import { InputTimeline } from './dto/timeline.input';

@Resolver('Timeline')
export class TimelineResolver {
  @Query((returns) => Timeline)
  getTimeline(): Timeline {
    return;
  }

  @Mutation((returns) => Timeline)
  createTimeline(@Args('input') input: InputTimeline): Timeline {
    return;
  }
}
