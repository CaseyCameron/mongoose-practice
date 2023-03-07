import { Mode } from '../../db/models/'
import { Request, Response } from 'express'

export const modesController = {
  addMode: async (req: Request, res: Response) => {
    const { name } = req.body
    try {
      if (!name) {
        return res.status(500).json({ message: 'No mode name entered' })
      } else {
        const doesModeExist = await Mode.findOne({ name })
        if (doesModeExist) {
          return res.status(500).json({ message: 'Mode already exists' })
        }
      }
      const mode = new Mode({
        name,
      })
      await mode.save()
      res.status(201).json({
        message: 'Success',
        mode,
      })
    } catch (error) {}
  },
  getModeById: async (req: Request, res: Response) => {
    const _id = req.params._id
    const mode = await Mode.findOne({ _id })
    res.status(200).json({
      message: 'Success',
      mode
    })
  },
  getModes: async (req: Request, res: Response) => {
    const modes = await Mode.find({})
    res.status(200).json({
      message: 'Success',
      modes,
    })
  },
  deleteAllModes: async (req: Request, res: Response) => {
    await Mode.deleteMany({})
    res.status(200).json({ message: 'Success' })
  },
}
