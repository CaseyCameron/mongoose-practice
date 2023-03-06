import Router from 'express'
import { scalesController } from '../controllers/'
import { catchErrors } from '../utils/handlers/catchErrors';

const router = Router()

router.post('/', catchErrors(scalesController.addScale))
router.get('/', catchErrors(scalesController.getScales))

export const scalesRouter = router