const express         = require('express')
const router          = express.Router()
const imageController = require('../controllers/imageController')
const upload          = require("../config/multer")

router.post('/', upload.single("file"), imageController.postImage)
router.post('/user', imageController.getImageByUserId)
router.post('/blob', imageController.getImageBlob)
// router.post('/filter', imageController.getUsersByFilter)

router.get('/all', imageController.getAllImages)

router.patch('/:id', imageController.updateImageByUserId)

router.delete('/:id', imageController.deleteImageByUserId)

module.exports = router