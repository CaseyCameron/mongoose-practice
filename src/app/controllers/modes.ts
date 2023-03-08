import { Mode } from '../../db/models'
import { NextFunction, Request, Response } from 'express'
import { checkIfNameExists, deleteCollection } from '../utils/helpers/generics'

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

    if (mode) {
      res.status(200).json({
        message: 'Success',
        mode,
      })
    } else {
      next(new Error('Mode not found'))
    }
  },
  getModes: async (req: Request, res: Response) => {
    const modes = await Mode.find({})

    if (modes.length) {
      res.status(200).json({
        message: 'Success',
        modes,
      })
    } else {
      res.status(200).json({
        message: 'There are no modes yet',
      })
    }
  },
  editMode: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id
    const mode = await Mode.findOneAndUpdate({ _id }, req.body, { new: true })

    if (mode) {
      res.status(200).json({ message: 'Success', mode })
    } else {
      next(new Error('Mode not found'))
    }
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

    deleteCollection(modes, deletedCount, res, next)
  },
}
