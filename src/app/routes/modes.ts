import Router from 'express'
import { modesController } from '../controllers/'
import { catchErrors } from '../utils/handlers/catchErrors'
const router = Router()

router.post('/', catchErrors(modesController.addMode))
router.delete('/', catchErrors(modesController.deleteAllModes))

export const modesRouter = router;