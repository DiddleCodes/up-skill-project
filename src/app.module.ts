/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from '@hapi/joi';
// import { SurveysController } from './surveys/surveys.controller';
// import { SurveyService } from './surveys/surveys.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';


@Module({
  
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
      }),
    }),
    // MongooseModule.forRoot(process.env.MONGODB_URI,{
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    // }),
  // MongooseModule.forRoot('mongodb+srv://Sparkles:c0dDJcNjTzZQp60f@cluster0.tull0j4.mongodb.net/surveyApp'),
   MongooseModule.forRootAsync({
     imports: [ConfigModule],
     inject:[ConfigService],
     useFactory: async (configService: ConfigService) => {
      const username = configService.get('MONGO_USERNAME');
      const password = configService.get('MONGO_PASSWORD');
      const database = configService.get('MONGO_DATABASE');
      const host = configService.get('MONGO_HOST');

   const  uri= `mongodb+srv://${username}:${password}@${host}`;
console.log('uri', uri)
      return {
        uri,
       dbName: database,
      };
    },
   }),
   AuthModule
],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
