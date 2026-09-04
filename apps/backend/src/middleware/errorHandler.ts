import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = 'statusCode' in err ? err.statusCode : 500;
  const isProd = process.env.NODE_ENV === 'production';

  console.error(`[Error] ${err.message}`, isProd ? '' : err.stack);

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(isProd ? {} : { stack: err.stack }),
  });
};
