import { Request, Response } from 'express'

const heartbeat = (req: Request, res: Response) => {
  res.json({
    message: 'All systems are go',
  })
}

export default heartbeat
