import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSurveyDTO, GenericMatch } from 'src/surveys/surveys.dto';
import { ISurvey } from 'src/surveys/surveys.schemas';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel('Survey')
    private surveyModel: Model<ISurvey>,
  ) {}

  async createSurvey(body: CreateSurveyDTO): Promise<ISurvey> {
    return (await this.surveyModel.create(body)).save();
  }

  async updateSurvey(_id, update: GenericMatch): Promise<ISurvey> {
    const updateSurvey = await this.surveyModel.findByIdAndUpdate(_id, update, {
      new: true,
    });
    if (!updateSurvey) {
      throw new HttpException(' Survey does not exist', HttpStatus.NOT_FOUND);
    }
    return updateSurvey;
  }

  async getSurveyById(id: string): Promise<ISurvey> {
    const survey = await this.surveyModel.findById(id);
    if (!survey) {
      throw new HttpException(' Survey does not exist', HttpStatus.NOT_FOUND);
    }
    return survey;
  }

  async getAllSurveys(): Promise<ISurvey[]> {
    const surveys = await this.surveyModel.find();
    if (!surveys || surveys.length == 0) {
      throw new HttpException(' No Survey found', HttpStatus.BAD_REQUEST);
    }
    return surveys;
  }
}
