import { NextFunction } from 'express';
import { Model } from 'mongoose'
import { Types } from 'mongoose'

export const checkIfNameExists = async <T>(
  model: Model<T>,
  _id: Types.ObjectId | string,
  name: string,
  method: string,
  next: NextFunction
): Promise<boolean | void> => {  
  let exists = false
  const results = await model.find({ name })

  if (method === 'POST') {
    if (results.length) exists = true
  } else {
    const sameNameFound = results.filter(item => item.id !== _id)
    if (sameNameFound.length) exists = true
  }
  
  if (exists) {
    return next(new Error(`${name} already exists`))
  } else {
    return false
  }
}
