import { Genre } from '../../db/models'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { checkIfNameExists } from '../utils/helpers/generics'

export const genresController = {
  addGenre: async (req: Request, res: Response, next: NextFunction) => {
    const { _id, name, origin } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    checkIfNameExists(Genre, _id, name, next)
  },
}
