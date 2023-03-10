import Router from 'express'
import { modesController } from '../controllers/'
import { body } from 'express-validator'
import { catchErrors } from '../utils/handlers/catchErrors'

const router = Router()
const validationCriteria = [body('name').notEmpty()]

router.post('/', validationCriteria, catchErrors(modesController.addMode))
router.get('/:_id', catchErrors(modesController.getModeById))
router.get('/', catchErrors(modesController.getModes))
router.put('/:_id', validationCriteria, catchErrors(modesController.editMode))
router.delete('/:_id', catchErrors(modesController.deleteMode))
router.delete('/', catchErrors(modesController.deleteAllModes))

export const modesRouter = router
