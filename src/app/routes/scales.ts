import Router from 'express'
import { scalesController } from '../controllers/'
import { catchErrors } from '../utils/handlers/catchErrors';

const router = Router()

router.post('/', catchErrors(scalesController.addScale))
router.get('/:_id', catchErrors(scalesController.getScaleById))
router.get('/', catchErrors(scalesController.getScales))
router.put('/:_id', catchErrors(scalesController.editScale))
router.delete('/:_id', catchErrors(scalesController.deleteScale))
router.delete('/', catchErrors(scalesController.deleteAllScales))

export const scalesRouter = router