import { Document, DocumentQuery, Model } from "mongoose";

export namespace Types {
  export type docs = Array<object> | object;
  export type options = object;
  export type projection = object | string;
  export type update = object;
  export type id = object | string | number;
}

export interface IRepositoryBase<T extends Document> {
  create: (docs: Types.docs, options?: Types.options) => Promise<T>;

  getAll: (
    projection?: Types.projection,
    options?: Types.options
  ) => DocumentQuery<T[], T>;

  getById: (
    id: Types.id,
    projection?: Types.projection,
    options?: Types.options
  ) => DocumentQuery<T, T>;

  updateById: (
    id: Types.id,
    update: Types.update,
    options?: Types.options
  ) => DocumentQuery<T, T>;

  deleteById: (id: Types.id, options?: Types.options) => DocumentQuery<T, T>;

  [name: string]: any;
}

export class RepositoryBase<T extends Document> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  create(docs: Types.docs, options?: Types.options) {
    return this._model.create(docs, options);
  }

  getAll(projection?: Types.projection, options?: Types.options) {
    return this._model.find({}, projection, options);
  }

  getById(
    id: Types.id,
    projection?: Types.projection,
    options?: Types.options
  ) {
    return this._model.findById(id, projection, options);
  }

  updateById(id: Types.id, update: Types.update, options?: Types.options) {
    return this._model.findByIdAndUpdate(id, update, options);
  }

  deleteById(id: Types.id, options?: Types.options) {
    return this._model.findByIdAndRemove(id, options);
  }
}
