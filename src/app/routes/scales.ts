import Router from 'express'
import { scalesController } from '../controllers/'
const router = Router()

router.post('/', scalesController.addScale)
router.get('/', scalesController.getScales)

export const scalesRouter = router