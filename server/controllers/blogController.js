const blogsService = require('../services/blogService')

exports.postBlog = async (req, res, next) => {
    const { titulo, subtitulo, texto, imagem } = req.body

    const response = await blogsService.postBlog(titulo, subtitulo, texto, imagem)

    response.sendResponse(res)
}

exports.getAllBlogs = async (req, res, next) => {
    const response = await blogsService.getAllBlogs()

    response.sendResponse(res)
}

exports.getBlogById = async (req, res, next) => {
    const { id }   = req.params
    const response = await blogsService.getBlogById(id)

    response.sendResponse(res)
}

exports.updateBlogById = async (req, res, next) => {
    const { id } = req.params
    const { field, value } = req.body

    const response = await blogsService.updateBlogById(id, field, value)

    response.sendResponse(res)
}

exports.deleteBlogById = async (req, res, next) => {
    const { id }   = req.params
    const response = await blogsService.deleteBlogById(id)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await blogsService.cleanDatabase()
 
    response.sendResponse(res)
}