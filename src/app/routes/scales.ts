import Router from 'express'
import { scalesController } from '../controllers/'
import { catchErrors } from '../utils/handlers/catchErrors';

const router = Router()

router.post('/', catchErrors(scalesController.addScale))
router.get('/', catchErrors(scalesController.getScales))
router.delete('/', catchErrors(scalesController.deleteAllScales))

export const scalesRouter = router