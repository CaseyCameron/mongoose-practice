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
}
