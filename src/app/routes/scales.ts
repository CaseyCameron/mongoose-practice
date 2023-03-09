import Router from 'express'
import { scalesController } from '../controllers/'
import { body } from 'express-validator'
import { catchErrors } from '../utils/handlers/catchErrors';

const router = Router()
const validationCriteria = [body('name').notEmpty()]

router.post('/', validationCriteria, catchErrors(scalesController.addScale))
router.get('/:_id', catchErrors(scalesController.getScaleById))
router.get('/', catchErrors(scalesController.getScales))
router.put('/:_id', validationCriteria, catchErrors(scalesController.editScale))
router.delete('/:_id', catchErrors(scalesController.deleteScale))
router.delete('/', catchErrors(scalesController.deleteAllScales))

export const scalesRouter = router