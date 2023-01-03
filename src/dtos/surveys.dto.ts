import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export interface GenericMatch {
  [key: string]: string | number | Date | any;
}

export class CreateSurveyDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  whatDoYouLikeAboutOurCompany: string;

  @IsString()
  howCanWeImprove: string;

  @IsString()
  howDidYouHearAboutUs: string;
}

export class UpdateSurveyDTO {
  @IsMongoId()
  _id: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  whatDoYouLikeAboutOurCompany: string;

  @IsString()
  howCanWeImprove: string;

  @IsString()
  howDidYouHearAboutUs: string;
}
