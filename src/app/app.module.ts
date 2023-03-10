/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from '@hapi/joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SurveysModule } from '../surveys/surveys.module';
import { UserModule } from '../user/user.module';


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
   MongooseModule.forRootAsync({
     imports: [ConfigModule],
     inject:[ConfigService],
     useFactory: async (configService: ConfigService) => {
      const username = configService.get('MONGO_USERNAME');
      const password = configService.get('MONGO_PASSWORD');
      const database = configService.get('MONGO_DATABASE');
      const host = configService.get('MONGO_HOST');

   const  uri= `mongodb+srv://${username}:${password}@${host}`;
      return {
        uri,
       dbName: database,
      };
    },
   }),
   UserModule,
   SurveysModule,
],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
