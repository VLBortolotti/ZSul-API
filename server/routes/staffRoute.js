const { ensureAuthorization } = require('../middlewares/ensureAuthentication')
const express          = require('express')
const staffController  = require('../controllers/staffController')
const router           = express.Router()
const upload  = require("../config/multer")

router.post('/', upload.single("file"), staffController.postStaff)
// router.post('/filter', staffController.getUsersByFilter)

router.get('/', staffController.getAllStaffs)
router.get('/:id', staffController.getStaffById)
router.get('/team/:id', staffController.getStaffsByTeamId)

router.patch('/:id', staffController.updateStaffById)

router.delete('/', staffController.cleanDatabase)
router.delete('/:id', staffController.deleteStaffById)

module.exports = router