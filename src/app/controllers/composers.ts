import { Composer } from '../../db/models/Composer'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { checkIfNameExists, deleteCollection } from '../utils/helpers/generics'
import { handleValidation } from '../utils/handlers/catchErrors';

export const composersController = {
  addComposer: async (req: Request, res: Response, next: NextFunction) => {
    const { name, dob, scalesUsed, musicGenres } = req.body

    handleValidation(req, next)
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
  deleteAllComposers: async (req: Request, res: Response, next: NextFunction) => {
    const composers = await Composer.find({})
    const { deletedCount } = await Composer.deleteMany({})

    deleteCollection(composers, deletedCount, res, next)
  }
}
