import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSurveyDTO, UpdateSurveyDTO } from 'src/dtos/surveys.dto';
import { ISurvey } from 'src/schemas/surveys.schemas';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel('Survey')
    private surveyModel: Model<ISurvey>,
  ) {}

  async createSurvey(createSurvey: CreateSurveyDTO): Promise<ISurvey> {
    return (await this.surveyModel.create(createSurvey)).save();
  }

  async updateSurvey(
    _id: string,
    updateDetails: UpdateSurveyDTO,
  ): Promise<ISurvey> {
    const updateSurvey = await this.surveyModel.findByIdAndUpdate(
      _id,
      updateDetails,
    );
    if (!updateSurvey) {
      throw new HttpException(' Survey does not exist', HttpStatus.NOT_FOUND);
    }
    return updateSurvey;
  }
}
