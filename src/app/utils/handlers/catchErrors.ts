import { Request, Response, NextFunction } from 'express'

export const catchErrors = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next)
  }
}

export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const errorDetails = {
    message: err.message,
    status: err.status,
  }
  return res.status(err.status || 500).json(errorDetails)
}
