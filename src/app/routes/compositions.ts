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

export const compositionsRouter = router
