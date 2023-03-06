import Router from 'express'
import { modesController } from '../controllers/'
const router = Router()

router.post('/', modesController.addMode)

export const modesRouter = router;