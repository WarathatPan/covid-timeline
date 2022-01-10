import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CovidModule } from './covid/covid.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/covid'),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
    }),
    CovidModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
