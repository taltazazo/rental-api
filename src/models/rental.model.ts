import { singleton } from "tsyringe";
import mongoose from "../database";
import RentalSI from "../interfaces/rental.interface";
import * as Joi from "joi";
import ValidationError from "../errors/ValidationError";
import { ValidationI } from "../interfaces/validation.interface";

const schema: mongoose.Schema<any> = new mongoose.Schema({
  carId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  start: Date,
  end: Date,
});

const model: mongoose.Model<any, {}> = mongoose.model<RentalSI>(
  "rentals",
  schema
);

const JoiSchema = Joi.object({
  carId: Joi.string().required(),
  userId: Joi.string().required(),
  start: Joi.date()
    .required()
    .greater(Date.now() - 1),
  end: Joi.date().required().min(Joi.ref("start")).required(),
  // TODO:: add price because price can be changed
});

@singleton()
export class RentalSchemaValidation implements ValidationI {
  validate = (value: any) => {
    const { error } = JoiSchema.validate(value);
    if (error) {
      throw new ValidationError(error.details[0].message);
    }
  };
}

export default model;
