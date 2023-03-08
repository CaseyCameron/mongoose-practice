import { Response, NextFunction } from 'express';
import { Document, Model, Types } from 'mongoose'

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

export const handleDocumentResponse = async <T extends Document, K>(
  document: T | null,
  model: Model<K>,
  res: Response,
  next: NextFunction
) => {
  const name = `${model.modelName.toLowerCase()}`
  if (document) {
    res.status(200).json({
      message: 'Success',
      [name]: document
    })
  } else {
    next(new Error(`${model.modelName} not found`))
  }
}

export const retrieveCollection = async <T extends Document, K>(
  documents: T[],
  model: Model<K>,
  res: Response,
) => {
  const name = `${model.modelName.toLowerCase()}s`
  if (documents.length) {
    res.status(200).json({
      message: 'Success',
      [name]: documents,
    })
  } else {
    res.status(200).json({
      message: `There are no ${name} yet`,
    })
  }
}

export const editDocument = async <T extends Document, K>(
  document: T | null, 
) => {}
