import { IRepositoryBase, Types } from "../repository/repositoryBase";
import { DocumentQuery } from "mongoose";

export interface IServiceBase {
  repository: IRepositoryBase<any>;

  create: (docs: Types.docs, options?: Types.options) => Promise<any>;

  getAll: (
    projection?: Types.projection,
    options?: Types.options
  ) => DocumentQuery<any[], any>;

  getById: (
    id: Types.id,
    projection?: Types.projection,
    options?: Types.options
  ) => DocumentQuery<any, any>;

  updateById: (
    id: Types.id,
    update: Types.update,
    options?: Types.options
  ) => DocumentQuery<any, any>;

  deleteById: (
    id: Types.id,
    options?: Types.options
  ) => DocumentQuery<any, any>;

  [name: string]: any;
}

export class ServiceBase {
  repository: IRepositoryBase<any>;
  constructor(repository: IRepositoryBase<any>) {
    this.repository = repository;
  }

  create(docs: Types.docs, options?: Types.options) {
    return this.repository.create(docs, options);
  }

  getAll(projection?: Types.projection, options?: Types.options) {
    return this.repository.getAll(projection, options);
  }

  getById(
    id: Types.id,
    projection?: Types.projection,
    options?: Types.options
  ) {
    return this.repository.getById(id, projection, options);
  }

  updateById(id: Types.id, update: Types.update, options?: Types.options) {
    return this.repository.updateById(id, update, options);
  }

  deleteById(id: Types.id, options?: Types.options) {
    return this.repository.deleteById(id, options);
  }
}
