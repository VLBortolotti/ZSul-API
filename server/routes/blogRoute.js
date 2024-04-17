const express = require('express')
const router  = express.Router()
const blogController = require('../controllers/blogController')

router.post('/', blogController.postBlog)

router.get('/', blogController.getAllBlogs)
router.get('/:id', blogController.getBlogById)

router.patch('/:id', blogController.updateBlogById)

router.delete('/', blogController.cleanDatabase)
router.delete('/:id', blogController.deleteBlogById)

module.exports = router