import { singleton } from "tsyringe";
import mongoose from "../database";
import UserSI from "../interfaces/user.interface";
import * as Joi from "joi";
import ValidationError from "../errors/ValidationError";
import { ValidationI } from "../interfaces/validation.interface";

const schema: mongoose.Schema<any> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const model: mongoose.Model<any, {}> = mongoose.model<UserSI>("users", schema);

const JoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  role: Joi.string().valid("admin", "user").required(),
});

@singleton()
export class UserSchemaValidation implements ValidationI {
  validate = (value: any) => {
    const { error } = JoiSchema.validate(value);
    if (error) {
      throw new ValidationError(error.details[0].message);
    }
  };
}

export default model;
