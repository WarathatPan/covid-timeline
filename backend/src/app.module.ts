import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TimelineModule } from './timeline/timeline.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      debug: false,
      playground: true,
    }),
    TimelineModule,
  ],
})
export class AppModule {}
