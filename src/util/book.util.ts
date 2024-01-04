import { HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export const delay = (ms: number) => {
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
};

export const CustomHttpException = (
  message: string,
  statusCode: HttpStatus,
) => {
  return new RpcException(
    new HttpException(
      {
        message,
        statusCode,
      },
      statusCode,
    ),
  );
};
