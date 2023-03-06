import { ModeDocument, Mode, Scale } from '../../../db/models'
import { Types } from 'mongoose'

export const scaleToPost = {
  name: 'Ionian',
  modes: [
    {
      name: 'Dorian',
    },
  ],
}

export const checkForScaleErrors = async (modes: ModeDocument[]) => {
  if (modes.length) {
    return await Promise.all(
      modes.map(async (modeName: ModeDocument) => {
        const mode = await Mode.findOne({ name: modeName.name })
        if (!mode) {
          throw new Error(`${modeName.name} mode does not exist`)
        }
        return mode._id
      })
    )
  } else {
    return []
  }
}

export const checkIfNameExists = async (name: string) => {
  const result = await Scale.find({ name })
  if (result.length) {
    throw new Error(`${name} already exists`)
  } else {
    return false
  }
}
