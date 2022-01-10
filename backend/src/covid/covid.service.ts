import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Covid, CovidDocument } from './covid.model';
import {
  CreateCovidInput,
  UpdateCovidInput,
} from './covid.inputs';

@Injectable()
export class CovidService {
  constructor(
    @InjectModel(Covid.name) private covidModel: Model<CovidDocument>,
  ) {}

  create(payload: CreateCovidInput) {
    const createdCovid = new this.covidModel(payload);
    createdCovid._id = '61dbd34a462414a67d1bbc74';
    console.log('covid==>', createdCovid);
    return createdCovid.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.covidModel.findById(_id).exec();
  }

  update(payload: UpdateCovidInput) {
    return this.covidModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.covidModel.findByIdAndDelete(_id).exec();
  }
}