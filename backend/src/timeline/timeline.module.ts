import { Module } from '@nestjs/common';
import { TimelineResolver } from './timeline.resolver';

@Module({
  providers: [TimelineResolver]
})
export class TimelineModule {}
