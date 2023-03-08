import Router from 'express'
import { composersController } from '../controllers/'
import { body } from 'express-validator'
import { catchErrors } from '../utils/handlers/catchErrors'

const router = Router()
const validationCriteria = [body('name').notEmpty()]

router.post(
  '/',
  validationCriteria,
  catchErrors(composersController.addComposer)
)

export const composersRouter = router
