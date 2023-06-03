import { singleton } from "tsyringe";
import mongoose from "../database";
import CarSI from "../interfaces/user.interface";
import * as Joi from "joi";
import { ValidationI } from "../interfaces/validation.interface";
import ValidationError from "../errors/ValidationError";

const schema: mongoose.Schema<any> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    enum: ["min", "mid", "large"],
    required: true,
  },
});

const model: mongoose.Model<any, {}> = mongoose.model<CarSI>("cars", schema);

const JoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().min(1).required(),
  size: Joi.string().valid("min", "mid", "large").required(),
});

@singleton()
export class CarSchemaValidation implements ValidationI {
  validate = (value: any) => {
    const { error } = JoiSchema.validate(value);
    if (error) {
      throw new ValidationError(error.details[0].message);
    }
  };
}

export default model;
