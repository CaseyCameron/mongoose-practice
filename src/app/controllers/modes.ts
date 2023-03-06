import { Mode } from '../../db/models/'
import { Request, Response, NextFunction } from 'express'

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
}
