import Scale from '../../db/models/Scale'
import { Request, Response, NextFunction } from 'express'


const scalesController = {
  addScale: async (req: Request, res: Response) => {
    try {
      const scale = new Scale(req.body)
      await scale.save()
      res.status(200).json({
        message: 'Success.',
        scale,
      })
    } catch (error) {}
  },
  getScales: async (req: Request, res: Response) => {
    res.status(200).json({
      message: 'Success.',
    })
  },
}

export default scalesController
