import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe";
import RentalSI from "../interfaces/rental.interface";
import BaseService from "./base.service";
import mongoose, { Model } from "mongoose";

@autoInjectable()
export default class RentalService extends BaseService<RentalSI> {
  constructor(@inject("RentalModel") model?: Model<RentalSI>) {
    super(model);
  }

  isCarAvailable = async (
    carId: string,
    start: Date,
    end: Date
  ): Promise<boolean> => {
    const agg = [
      {
        $match: {
          carId: new mongoose.Types.ObjectId(carId),
          $expr: {
            $not: {
              $or: [
                {
                  $gt: [new Date(start), "$end"],
                },
                {
                  $lt: [new Date(end), "$start"],
                },
              ],
            },
          },
        },
      },
    ];
    // TODO:: this aggregation should be in RentalQueryBuilder
    // should add another stage instead of getting all rentals objects to memory
    const rentals = await this.model.aggregate(agg);

    return rentals.length === 0;
  };
}
