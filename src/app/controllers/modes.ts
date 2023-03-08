import { Mode } from '../../db/models'
import { NextFunction, Request, Response } from 'express'
import { checkIfNameExists, deleteCollection, handleCollectionResponse, handleDocumentResponse } from '../utils/helpers/generics'

export const modesController = {
  addMode: async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body

    await checkIfNameExists(Mode, name, req.method, next)

    const mode = new Mode({
      name,
    })
    await mode.save()

    res.status(201).json({
      message: 'Success',
      mode,
    })
  },
  getModeById: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id
    const mode = await Mode.findOne({ _id })

    await handleDocumentResponse(mode, Mode, res, next)
  },
  getModes: async (req: Request, res: Response) => {
    const modes = await Mode.find({})

    await handleCollectionResponse(modes, Mode, res)
  },
  editMode: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id
    const mode = await Mode.findOneAndUpdate({ _id }, req.body, { new: true })

  await handleDocumentResponse(mode, Mode, res, next)
  },
  deleteMode: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id
    const { deletedCount } = await Mode.deleteOne({ _id })

    if (deletedCount) {
      res.status(200).json({ message: 'Success' })
    } else {
      next(new Error('Mode not found'))
    }
  },
  deleteAllModes: async (req: Request, res: Response, next: NextFunction) => {
    const modes = await Mode.find({})
    const { deletedCount } = await Mode.deleteMany({})

    await deleteCollection(modes, deletedCount, res, next)
  },
}
