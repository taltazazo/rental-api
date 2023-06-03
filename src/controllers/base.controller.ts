import { Request, Response } from "express";
import BaseService from "../services/base.service";
import { ValidationI } from "../interfaces/validation.interface";
import NotFoundError from "../errors/NotFoundError";

export default class BaseController {
  service: BaseService<any>;
  schemaValidation: ValidationI;

  constructor(service: BaseService<any>, schemaValidation: ValidationI) {
    this.service = service;
    this.schemaValidation = schemaValidation;
  }

  get = async (req: Request, res: Response) => {
    const queryParams = req.query;
    // TODO:: check that query params are valid and will not crash the app like some regular expressions

    const resource = await this.service.get(queryParams);
    res.send(resource);
  };

  post = async (req: Request, res: Response): Promise<void> => {
    this.schemaValidation.validate(req.body);

    const resource = await this.service.post(req.body);
    res.send(resource);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.schemaValidation.validate(req.body);

    const resource = await this.service.update(id, req.body);
    if (!resource) {
      throw new NotFoundError("No data found");
    }

    res.send(resource);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resource = await this.service.getById(id);
    if (!resource) {
      throw new NotFoundError("No data found");
    }
    res.send(resource);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const resource = await this.service.delete(id);
    res.send(resource);
  };
}
