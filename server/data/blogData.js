const Blog = require('../models/BlogModel')

exports.postBlog = async (titulo, subtitulo, texto, imagem) => {
    const blog = new Blog({ titulo, subtitulo, texto, imagem })

    return await blog.save()
}

exports.getAllBlogs = async () => {
    return await Blog.find({ }, '-__v')
}

exports.getBlogById = async (id) => {
    return await Blog.findOne({ _id: id }, '-__v')
}

exports.getBlogByTitulo = async (titulo) => {
    return await Blog.find({ titulo: titulo }, '-__v')
}

exports.deleteBlogById = async (id) => {
    return await Blog.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return await Blog.deleteMany({  })
}