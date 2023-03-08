import { Composer } from '../../db/models/Composer'
import { NextFunction, Request, Response } from 'express'
import {
  checkIfNameExists,
  deleteCollectionResponse,
  handleCollectionResponse,
  deleteDocumentResponse,
  handleDocumentResponse,
} from '../utils/helpers/generics'
import { handleValidation } from '../utils/handlers/catchErrors'

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

    await handleDocumentResponse(composer, Composer, res, next)
  },
  getComposers: async (req: Request, res: Response) => {
    const composers = await Composer.find({})

    await handleCollectionResponse(composers, Composer, res)
  },
  editComposers: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id
    const composerName = req.body.name

    await checkIfNameExists(Composer, composerName, req.method, next, _id)
    handleValidation(req, next)

    const composer = await Composer.findOneAndUpdate({ _id }, req.body, {
      new: true,
    })
    await handleDocumentResponse(composer, Composer, res, next)
  },
  deleteComposer: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id
    const { deletedCount } = await Composer.deleteOne({ _id })
    await deleteDocumentResponse(deletedCount, Composer, res, next)
  },
  deleteAllComposers: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const composers = await Composer.find({})
    const { deletedCount } = await Composer.deleteMany({})

    await deleteCollectionResponse(composers, deletedCount, res, next)
  },
}
