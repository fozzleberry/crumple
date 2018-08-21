export type linkedResponse = {
  status: string;
  statusCode: number;
  link: string;
  data?: any;
};

export type okResponse = {
  status: string;
  statusCode: number;
  data: any;
  link?: string;
};

export type errorResponse = {
  status: string;
  statusCode: number;
  message: string;
  data?: any;
};

export type errorMessages = {
  notFound: string;
  internalServer: string;
  validationError: string;
  badRequest: string;
  conflict: string;
};

export type statusCodes = {
  success: number;
  created: number;
  badRequest: number;
  notFound: number;
  conflict: number;
  validationError: number;
  internalServer: number;
};

export type statusMessages = {
  success: string;
  fail: string;
  error: string;
};

export interface IResponseFactory {
  errorMessages: errorMessages;
  statusCodes: statusCodes;
  statusMessages: statusMessages;
  ok: (data?: any, link?: any) => okResponse;
  created: (link: string, data?: any) => linkedResponse;
  response: (
    status: string,
    statusCode: string,
    data: any,
    ...others: any[]
  ) => any;
  invalid: (data?: any) => errorResponse;
  notFound: (data?: any) => errorResponse;
  badRequest: (data?: any) => errorResponse;
  internalServerError: (data?: any) => errorResponse;
  conflict: (data?: any) => errorResponse;
  errorResponse: (
    status: string,
    statusCode: string,
    message: string,
    data?: any,
    ...others: any[]
  ) => any;
  [name: string]: any;
}

export class ResponseFactory {
  protected errorMessages: errorMessages = {
    notFound: "not found",
    internalServer: "internal server error",
    validationError: "validation error",
    badRequest: "bad request",
    conflict: "resource already exists ( duplicate key )"
  };

  protected statusCodes: statusCodes = {
    success: 200,
    created: 201,
    badRequest: 400,
    notFound: 404,
    conflict: 409,
    validationError: 422,
    internalServer: 500
  };

  protected statusMessages: statusMessages = {
    success: "success",
    fail: "fail",
    error: "error"
  };

  ok(data?: any, link?: any): okResponse {
    return {
      status: this.statusMessages.success,
      statusCode: this.statusCodes.success,
      data,
      link
    };
  }

  created(link: string, data?: any): linkedResponse {
    return {
      status: this.statusMessages.success,
      statusCode: this.statusCodes.created,
      link,
      data
    };
  }

  response(
    status = this.statusMessages.success,
    statusCode = this.statusCodes.success,
    data: any,
    ...others: any[]
  ): any {
    return {
      status: this.statusMessages.success,
      statusCode: this.statusCodes.success,
      data,
      ...others
    };
  }

  invalid(data?: any): errorResponse {
    return {
      status: this.statusMessages.fail,
      statusCode: this.statusCodes.validationError,
      message: this.errorMessages.validationError,
      data
    };
  }

  notFound(data?: any): errorResponse {
    return {
      status: this.statusMessages.error,
      statusCode: this.statusCodes.notFound,
      message: this.errorMessages.notFound,
      data
    };
  }

  badRequest(data?: any): errorResponse {
    return {
      status: this.statusMessages.error,
      statusCode: this.statusCodes.badRequest,
      message: this.errorMessages.badRequest,
      data
    };
  }

  internalServerError(data?: any): errorResponse {
    return {
      status: this.statusMessages.error,
      statusCode: this.statusCodes.internalServer,
      message: this.errorMessages.internalServer,
      data
    };
  }

  conflict(data?: any): errorResponse {
    return {
      status: this.statusMessages.error,
      statusCode: this.statusCodes.conflict,
      message: this.errorMessages.conflict,
      data
    };
  }

  errorResponse(
    status = this.statusMessages.error,
    statusCode = this.statusCodes.internalServer,
    message = this.errorMessages.internalServer,
    data?: any,
    ...others: any[]
  ): any {
    return {
      status,
      statusCode,
      message,
      data,
      ...others
    };
  }
}
