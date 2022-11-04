import {HttpException, HttpStatus} from "@nestjs/common";


export function next(err) {
  if (err instanceof HttpException) {
    return {
      message: err.message,
      status: err.getStatus(),
    };
  } else if (err.status !== 500) {
    return {
      message: err.message,
      status: HttpStatus.BAD_REQUEST,
    };
  }
  return {
    message: err.message,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  };
}