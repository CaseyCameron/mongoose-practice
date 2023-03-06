import { ModeDocument, Mode, Scale } from '../../db/models'
import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'

export const scalesController = {
  addScale: async (req: Request, res: Response) => {
    const { name: scaleName, modes: ModesArray } = req.body
    let modes: Types.ObjectId[] = []
    try {
      if (ModesArray.length) {
        await Promise.all(ModesArray.map(async (modeName: ModeDocument) => {
          const modeToAdd = await Mode.findOne({ name: modeName.name })
          console.log('modeToAdd', modeToAdd)
          if (modeToAdd) {
            modes.push(modeToAdd._id)
          } else {
            return res.status(404).json({ message: `Mode: ${modeName} not found` })
          }
        }))
      }
      const scale = new Scale({
        name: scaleName,
        modes,
      })
      await scale.save()
      res.status(201).json({
        message: 'Success',
        scale,
      })
    } catch (error) {
      console.error(error);
      
    }
  },
  getScales: async (req: Request, res: Response) => {
    res.status(200).json({
      message: 'Success',
    })
    //.populate with name
  },
}
