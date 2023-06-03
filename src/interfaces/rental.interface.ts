import mongoose from "../database";

export interface RentalI {
  carId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  start: Date;
  end: Date;
}

export default interface RentalSI extends RentalI, mongoose.Document {}
