import { Genre } from '../../db/models'
import { NextFunction, Request, Response } from 'express'
import { checkIfNameExists, deleteCollection } from '../utils/helpers/generics'
import { handleValidation } from '../utils/handlers/catchErrors';

export const genresController = {
  addGenre: async (req: Request, res: Response, next: NextFunction) => {
    const { name, origin } = req.body

    handleValidation(req, next)
    await checkIfNameExists(Genre, name, req.method, next)

    const genre = new Genre({
      name,
      origin,
    })

    await genre.save()
    res.status(201).json({
      message: 'Success',
      genre,
    })
  },  getGenreById: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id
    const genre = await Genre.findOne({ _id })

    if (genre) {
      res.status(200).json({
        message: 'Success',
        genre,
      })
    } else {
      next(new Error('Genre not found'))
    }
  },
  getGenres: async (req: Request, res: Response) => {
    const genres = await Genre.find({})

    if (genres.length) {
      res.status(200).json({
        message: 'Success',
        genres,
      })
    } else {
      res.status(200).json({
        message: 'There are no genres yet',
      })
    }
  },
  editGenre: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id
    const genreName = req.body.name

    await checkIfNameExists(Genre, genreName, req.method, next, _id)
    handleValidation(req, next)

    const genre = await Genre.findOneAndUpdate({ _id }, req.body, { new: true })
    if (genre) {
      res.status(200).json({ message: 'Success', genre})
    } else {
      next (new Error('Genre not found'))
    }
  },
  deleteGenre: async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params._id
    const { deletedCount } = await Genre.deleteOne({ _id })

    if (deletedCount) {
      res.status(200).json({ message: 'Success' })
    } else {
      next(new Error('Genre not found'))
    }
  },
  deleteAllGenres: async (req: Request, res: Response, next: NextFunction) => {
    const genres = await Genre.find({})
    const { deletedCount } = await Genre.deleteMany({})

    deleteCollection(genres, deletedCount, res, next)
  },
}
