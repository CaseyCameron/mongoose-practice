import { Request, Response, NextFunction } from 'express'

const scalesController = {
  getScales: (req: Request, res: Response) => {
    res.status(200).json({
      message: 'Success.',
    })
  },
}

export default scalesController
