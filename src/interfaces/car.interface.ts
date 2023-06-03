import mongoose from "../database";

enum Size {
  min = "min",
  mid = "mid",
  large = "large",
}

export interface CarI {
  name: string;
  price: number;
  size: Size;
}

export default interface CarSI extends CarI, mongoose.Document {}
