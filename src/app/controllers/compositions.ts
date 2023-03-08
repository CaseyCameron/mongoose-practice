import { Composition } from '../../db/models/Composition'
import { NextFunction, Request, Response } from 'express'
import {
  checkIfNameExists,
  deleteCollectionResponse,
  handleCollectionResponse,
  deleteDocumentResponse,
  handleDocumentResponse,
} from '../utils/helpers/generics'
import { handleValidation } from '../utils/handlers/catchErrors'

export const compositionsController = {
  addComposition: async (req: Request, res: Response, next: NextFunction) => {
    const { name, composer, scalesUsed, musicGenres } = req.body

    handleValidation(req, next)
    await checkIfNameExists(Composition, name, req.method, next)

    const composition = new Composition({
      name,
      composer,
      scalesUsed,
      musicGenres,
    })

    await composition.save()
    res.status(201).json({
      message: 'Success',
      composition,
    })
  },
  getCompositions: async (req: Request, res: Response) => {
    const compositions = await Composition.find({})

    await handleCollectionResponse(compositions, Composition, res)
  },
  deleteAllCompositions: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const compositions = await Composition.find({})
    const { deletedCount } = await Composition.deleteMany({})

    await deleteCollectionResponse(compositions, deletedCount, res, next)
  },
}
