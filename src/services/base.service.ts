import mongoose from "mongoose";

export default class BaseService<T> {
  model: mongoose.Model<any, any>;
  constructor(model: mongoose.Model<any, any>) {
    this.model = model;
  }

  get = async (filters = {}): Promise<T[]> => {
    const resource = (await this.model.find(filters)) as T[];
    return resource;
  };

  post = async (data: T): Promise<any> => {
    const resource = await this.model.create(data);
    return resource;
  };

  update = async (id: string, data: T): Promise<T> => {
    const resource = (await this.model.findOneAndUpdate({ _id: id }, data, {
      new: true,
    })) as T;
    return resource;
  };

  getById = async (id: string): Promise<T> => {
    const resource = (await this.model.findOne({
      _id: id,
    })) as T;
    return resource;
  };

  delete = async (id: string): Promise<void> => {
    await this.model.deleteOne({ _id: id });
  };
}
