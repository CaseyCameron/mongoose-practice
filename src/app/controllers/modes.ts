import { Mode } from '../../db/models'
import { NextFunction, Request, Response } from 'express'
import { checkIfNameExists, deleteCollectionResponse, deleteDocumentResponse, handleCollectionResponse, handleDocumentResponse } from '../utils/helpers/generics'

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

    await deleteDocumentResponse(deletedCount, Mode, res, next)
  },
  deleteAllModes: async (req: Request, res: Response, next: NextFunction) => {
    const modes = await Mode.find({})
    const { deletedCount } = await Mode.deleteMany({})

    await deleteCollectionResponse(modes, deletedCount, res, next)
  },
}
