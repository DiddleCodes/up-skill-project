import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SurveyService } from './surveys.service';
import { ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateSurveyDTO, UpdateSurveyDTO } from 'src/surveys/surveys.dto';
import { AdminRolesGuard } from 'src/user/authGuard';

@Controller('survey')
@ApiTags('Survey')
export class SurveysController {
  constructor(private surveyService: SurveyService) {}

  @ApiResponse({
    status: 200,
    description: 'Survey has been succesfully created',
  })
  // @UseGuards()
  @Post('/create')
  async createSurvey(
    @Res() response,
    @Body()
    body: CreateSurveyDTO,
  ) {
    try {
      const newSurvey = await this.surveyService.createSurvey(body);

      return response.status(HttpStatus.CREATED).json({
        sucess: true,
        statusCode: 200,
        message: 'Survey has been created successfully',
        newSurvey,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error encountered creating Survey',
        error: false,
      });
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Survey updated  successfully',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a Survey Form in the database',
    type: String,
  })
  @Patch('update/:id')
  async updateSurvey(
    @Res() response,
    @Param('id') id: string,
    @Body() body: UpdateSurveyDTO,
  ) {
    try {
      const surveyUpdate = await this.surveyService.updateSurvey(id, body);

      return response.status(HttpStatus.ACCEPTED).json({
        sucess: true,
        statusCode: 200,
        message: 'Survey updated  successfully ',
        surveyUpdate,
      });
    } catch (err) {
      //return response.status(err.status).json(err.response);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error encountered updating Survey',
        error: false,
      });
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Survey updated  successfully',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a Survey Form in the database',
    type: String,
  })
  @UseGuards(AdminRolesGuard)
  @Get('/:id')
  async getSurveyById(@Res() response, @Param('id') _id: string) {
    try {
      const getUser = await this.surveyService.getSurveyById(_id);

      return response.status(HttpStatus.FOUND).json({
        sucess: true,
        statusCode: 200,
        message: 'Survey gotten  successfully ',
        getUser,
      });
    } catch (err) {
      //return response.status(err.status).json(err.response);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error encountered fetching Survey',
        error: false,
      });
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Surveys gotten successfully',
  })
  @Get('/')
  async getSurveys(@Res() response) {
    try {
      const surveyData = await this.surveyService.getAllSurveys();
      return response.status(HttpStatus.FOUND).json({
        message: 'All Survey data gotten successfully',
        surveyData,
      });
    } catch (err) {
      // return response.status(err.status).json(err.response);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error encountered fetching Surveys',
        error: false,
      });
    }
  }
}
