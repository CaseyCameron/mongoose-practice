import { Response, NextFunction } from 'express';
import mongoose, { Document, Model, Types } from 'mongoose'

export const checkIfNameExists = async <T>(
  model: Model<T>,
  name: string,
  method: string,
  next: NextFunction,
  _id?: Types.ObjectId | string | undefined,
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

export const deleteCollection = async <T extends Document>(
  documents: T[],
  deletedCount: number,
  res: Response,
  next: NextFunction
) => {
  if (documents.length === deletedCount) {
    res.status(200).json({ message: 'Success' })
  } else {
    next(new Error('Could not delete all items'))
  }
}
