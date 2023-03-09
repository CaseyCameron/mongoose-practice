import Router from 'express'
import { compositionsController } from '../controllers/'
import { body } from 'express-validator'
import { catchErrors } from '../utils/handlers/catchErrors'

const router = Router()
const validationCriteria = [body('name').notEmpty()]

router.post(
  '/',
  validationCriteria,
  catchErrors(compositionsController.addComposition)
)
router.get('/:_id', catchErrors(compositionsController.getComposition))
router.get('/', catchErrors(compositionsController.getCompositions))
router.put('/:_id', validationCriteria, catchErrors(compositionsController.editComposition))
router.delete('/', catchErrors(compositionsController.deleteAllCompositions))

export const compositionsRouter = router
