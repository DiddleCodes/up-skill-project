import { Module } from '@nestjs/common';
import { SurveyService } from './surveys.service';
import { SurveySchema } from 'src/surveys/surveys.schemas';
import { SurveysController } from './surveys.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  exports: [SurveyService],
  imports: [
    MongooseModule.forFeature([{ name: 'Survey', schema: SurveySchema }]),
  ],
  controllers: [SurveysController],
  providers: [SurveyService],
})
export class SurveysModule {}
