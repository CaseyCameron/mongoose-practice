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
router.delete('/', catchErrors(compositionsController.deleteAllCompositions))

export const compositionsRouter = router
