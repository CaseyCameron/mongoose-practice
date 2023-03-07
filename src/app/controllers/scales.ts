import { Scale } from '../../db/models'
import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'
import { checkForNameErrors } from '../utils/helpers/generics'
import { checkForScaleErrors } from '../utils/helpers/scales'

export const scalesController = {
  addScale: async (req: Request, res: Response, next: NextFunction) => {
    const { name: scaleName, modes: modesArray } = req.body
    let modes: Types.ObjectId[] = []

    modes = await checkForScaleErrors(modesArray, next)
    checkForNameErrors(Scale, scaleName, next)

    const scale = new Scale({
      name: scaleName,
      modes,
    })

    await scale.save()
    res.status(201).json({
      message: 'Success',
      scale,
    })
  },
  getScaleById: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id
    const scale = await Scale.findOne({ _id })

    if (scale) {
      res.status(200).json({
        message: 'Success',
        scale,
      })
    } else {
      next(new Error('Scale not found'))
    }
  },
  getScales: async (req: Request, res: Response) => {
    const scales = await Scale.find({}).populate({ path: 'modes' })

    if (scales.length) {
      res.status(200).json({
        message: 'Success',
        scales,
      })
    } else {
      res.status(200).json({ message: 'There are no scales yet' })
    }
  },
  editScale: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id
    const scale = await Scale.findOneAndUpdate({ _id }, req.body, { new: true })

    if (scale) {
      res.status(200).json({ message: 'Success', scale })
    } else {
      next(new Error('Scale not found'))
    }
  },
  deleteScale: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id
    const { deletedCount } = await Scale.deleteOne({ _id })

    if (deletedCount) {
      res.status(200).json({ message: 'Success' })
    } else {
      next(new Error('Scale not found'))
    }
  },
  deleteAllScales: async (req: Request, res: Response, next: NextFunction) => {
    const scales = await Scale.find({})
    const { deletedCount } = await Scale.deleteMany({})

    if (scales.length == deletedCount) {
      res.status(200).json({
        message: 'Success',
      })
    } else {
      next(new Error('Could not delete all scales'))
    }
  },
}
