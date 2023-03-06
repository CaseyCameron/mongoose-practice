import { Response } from 'express'
import { Mode } from '../../../db/models/Mode'

export const modePostValidation = async (name: string, res: Response) => {
  if (!name) {
    return res.status(500).json({ message: 'No mode name entered' })
  } else {
    const doesModeExist = await Mode.findOne({ name })
    if (doesModeExist) {
      return res.status(500).json({ message: 'Mode already exists' })
    }
  }
  return res.status(200)
}
