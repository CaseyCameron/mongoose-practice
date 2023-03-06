import { Response } from 'express'

export const handleError = (error: Error, res: Response) => {
  res.status(500).send({ message: error.message })
  console.error(error)
}
