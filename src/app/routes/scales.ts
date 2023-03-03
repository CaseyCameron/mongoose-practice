import Router from 'express'
import scalesController from '../controllers/scales'
const router = Router()

router.post('/', scalesController.addScale)
router.get('/', scalesController.getScales)

export default router
