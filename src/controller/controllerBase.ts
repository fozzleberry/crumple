import {
  ResponseFactory,
  IResponseFactory
} from "../responseFactory/responseFactory";
import { IServiceBase } from "../service/serviceBase";
import { Types } from "../repository/repositoryBase";

export interface IControllerBase {
  service: IServiceBase;
  responseFactory: IResponseFactory;

  create: (res: any, docs: Types.docs, options?: Types.options) => void;

  getAll: (
    res: any,
    projection?: Types.projection,
    options?: Types.options
  ) => void;

  getById: (
    res: any,
    id: object | string | number,
    projection?: Types.projection,
    options?: Types.options
  ) => void;

  updateById: (
    res: any,
    id: Types.id,
    update: Types.update,
    options: Types.options
  ) => void;

  deleteById: (res: any, id: Types.id, options?: Types.options) => void;

  processError: (err: any, res: any) => void;
  [name: string]: any;
}

export class ControllerBase {
  service: IServiceBase;
  responseFactory: IResponseFactory;

  constructor(
    service: IServiceBase,
    responseFactory: any = new ResponseFactory()
  ) {
    this.service = service;
    this.responseFactory = responseFactory;
  }

  async create(res: any, docs: Types.docs, options?: Types.options) {
    try {
      const result = await this.service.create(docs, options);

      const location = `${res.req.originalUrl}/${result._id}`;
      const response = this.responseFactory.created(location, result);

      res.location(location);
      res.json(response);
    } catch (err) {
      this.processError(err, res);
    }
  }

  async getAll(
    res: any,
    projection?: Types.projection,
    options?: Types.options
  ) {
    try {
      const result = await this.service.getAll(projection, options);

      const response = this.responseFactory.ok(result);

      res.json(response);
    } catch (err) {
      this.processError(err, res);
    }
  }

  async getById(
    res: any,
    id: object | string | number,
    projection?: Types.projection,
    options?: Types.options
  ) {
    try {
      const result = await this.service.getById(id, projection, options);

      let response: any;

      if (!result) {
        response = this.responseFactory.notFound();
      } else {
        response = this.responseFactory.ok(result);
      }
      res.json(response);
    } catch (err) {
      this.processError(err, res);
    }
  }

  async updateById(
    res: any,
    id: Types.id,
    update: Types.update,
    options: Types.options = { new: true }
  ) {
    try {
      const result = await this.service.updateById(id, update, options);

      let response: any;

      if (!result) {
        response = this.responseFactory.notFound();
      } else {
        const location = `${res.req.originalUrl}/${result._id}`;
        response = this.responseFactory.ok(result, location);
        res.location(location);
      }
      res.json(response);
    } catch (err) {
      this.processError(err, res);
    }
  }

  async deleteById(res: any, id: Types.id, options?: Types.options) {
    try {
      const result = await this.service.deleteById(id, options);

      let response: any;

      if (!result) {
        response = this.responseFactory.notFound();
      } else {
        response = this.responseFactory.ok(result);
      }
      res.json(response);
    } catch (err) {
      this.processError(err, res);
    }
  }

  processError(err: any, res: any) {
    let response;

    if (err.name == "ValidationError") {
      response = this.responseFactory.invalid(err.errors);
    } else if (err.name == "CastError") {
      response = this.responseFactory.badRequest(err.errors);
    } else if (err.name === "MongoError" && err.code === 11000) {
      response = this.responseFactory.conflict(err.errors);
    } else {
      if (process.env.NODE_ENV != "production") {
        response = this.responseFactory.internalServerError(err);
      } else {
        response = this.responseFactory.internalServerError();
      }
    }

    res.json(response);
  }
}
