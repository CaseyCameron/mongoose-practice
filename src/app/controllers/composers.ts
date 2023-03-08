import { Composer } from '../../db/models/Composer'
import { NextFunction, Request, Response } from 'express'
import {
  checkIfNameExists,
  deleteCollection,
  retrieveCollection,
  retrieveDocument,
} from '../utils/helpers/generics'
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
  getComposer: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id
    const composer = await Composer.findById({ _id })

    await retrieveDocument(composer, Composer, res, next)
  },
  getComposers: async (req: Request, res: Response) => {
    const composers = await Composer.find({})

    retrieveCollection(composers, Composer, res)
  },
  deleteAllComposers: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const composers = await Composer.find({})
    const { deletedCount } = await Composer.deleteMany({})

    deleteCollection(composers, deletedCount, res, next)
  },
}
