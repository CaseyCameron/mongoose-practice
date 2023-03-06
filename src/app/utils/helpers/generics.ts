import { NextFunction } from 'express';
import { Model } from 'mongoose'

export const checkIfNameExists = async <T>(
  model: Model<T>,
  name: string,
  next: NextFunction
): Promise<boolean | void> => {
  const result = await model.find({ name })
  if (result.length) {
    return next(new Error(`${name} already exists`))
  } else {
    return false
  }
}
