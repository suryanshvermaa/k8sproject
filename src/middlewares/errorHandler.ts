import { NextFunction, Request, Response } from 'express';
import { AppError } from './error';

const errorHandler = (err: Error | AppError,req: Request,res: Response,next:NextFunction) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
