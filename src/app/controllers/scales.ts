import { Scale } from '../../db/models'
import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'
import { checkIfNameExists } from '../utils/helpers/generics'
import { checkForScaleErrors } from '../utils/helpers/scales'

export const scalesController = {
  addScale: async (req: Request, res: Response, next: NextFunction) => {
    const { name: scaleName, modes: modesArray } = req.body
    let modes: Types.ObjectId[] = []

    checkIfNameExists(Scale, scaleName, next)
    modes = await checkForScaleErrors(modesArray, next)

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
  getScales: async (req: Request, res: Response) => {
    const scales = await Scale.find({}).populate({ path: 'modes' })
    res.status(200).json({
      message: 'Success',
      scales,
    })
  },
}
