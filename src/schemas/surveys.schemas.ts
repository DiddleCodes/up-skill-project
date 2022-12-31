import { Schema, Types } from 'mongoose';

export class Survey {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  whatDoYouLikeAboutOurCompany: string;
  howCanWeImprove: string;
  howDidYouHearAboutUs: string;
}

export interface ISurvey extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  whatDoYouLikeAboutOurCompany: string;
  howCanWeImprove: string;
  howDidYouHearAboutUs: string;
}

export const SurveyReportSchema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    whatDoYouLikeAboutOurCompany: {
      type: String,
    },
    howCanWeImprove: {
      type: String,
    },
    howDidYouHearAboutUs: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
