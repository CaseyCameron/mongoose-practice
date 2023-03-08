import Router from 'express'
import { composersController } from '../controllers/'
import { body } from 'express-validator'
import { catchErrors } from '../utils/handlers/catchErrors'

const router = Router()
const validationCriteria = [body('name').notEmpty(), body('dob').notEmpty()]

router.post(
  '/',
  validationCriteria,
  catchErrors(composersController.addComposer)
)
router.get('/:_id', catchErrors(composersController.getComposer))
router.get('/', catchErrors(composersController.getComposers))
router.put('/:_id', validationCriteria, catchErrors(composersController.editComposers))
router.delete('/', catchErrors(composersController.deleteAllComposers))
export const composersRouter = router
