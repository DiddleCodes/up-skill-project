/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';
// import { SurveysController } from './surveys/surveys.controller';
// import { SurveyService } from './surveys/surveys.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';


@Module({
  
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.MONGODB_URI,{
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    // }),
   MongooseModule.forRoot('mongodb+srv://Sparkles:c0dDJcNjTzZQp60f@cluster0.tull0j4.mongodb.net/test'),
   MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
   AuthModule
],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
