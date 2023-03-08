import { Composer } from '../../db/models/Composer'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { checkIfNameExists } from '../utils/helpers/generics'

export const composersController = {
  addComposer: async (req: Request, res: Response, next: NextFunction) => {
    const { name, dob, scalesUsed, musicGenres } = req.body

    await checkIfNameExists(Composer, name, req.method, next)

    const composer = new Composer({
      name,
      dob,
      scalesUsed,
      musicGenres,
    })

    await composer.save()
    res.status(201).json({
      message: 'Success',
      composer,
    })
  },
}
