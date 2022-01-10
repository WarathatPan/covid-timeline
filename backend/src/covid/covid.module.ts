import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CovidSchema } from './covid.model';
import { CovidService } from './covid.service';
import { CovidResolver } from './covid.resolver';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Covid', schema: CovidSchema }]),
    ],
    providers: [CovidService, CovidResolver],
})
export class CovidModule {}
