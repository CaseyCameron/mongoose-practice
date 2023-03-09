import Router from 'express'
import { genresController } from '../controllers'
import { body } from 'express-validator'
import { catchErrors } from '../utils/handlers/catchErrors'

const router = Router()
const validationCriteria = [body('name').notEmpty(), body('origin').notEmpty()]

router.post('/', validationCriteria, catchErrors(genresController.addGenre))
router.get('/:_id', catchErrors(genresController.getGenreById))
router.get('/', catchErrors(genresController.getGenres))
router.put('/:_id', validationCriteria, catchErrors(genresController.editGenre))
router.delete('/:_id', catchErrors(genresController.deleteGenre))
router.delete('/', catchErrors(genresController.deleteAllGenres))

export const genresRouter = router
