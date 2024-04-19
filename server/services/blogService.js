const secret          = process.env.SECRET
const { ResponseDTO } = require('../dtos/Response')
const ObjectId        = require('mongoose').Types.ObjectId;
const blogData        = require('../data/blogData')

exports.postBlog = async (titulo, subtitulo, texto, imagem, tipoImagem) => {
    try {
        if (!titulo) {
            return new ResponseDTO('Error', 400, 'Título não preenchido')
        }

        if (!subtitulo) {
            return new ResponseDTO('Error', 400, 'Subtítulo não preenchido')
        }

        if (!texto) {
            return new ResponseDTO('Error', 400, 'Texto não preenchido')
        }

        if (!imagem) {
            return new ResponseDTO('Error', 400, 'Imagem não preenchida')
        }

        if (!tipoImagem) {
            return new ResponseDTO('Error', 400, 'Extensão da imagem não preenchida')
        }

        const dataUrl = `data:image/${tipoImagem};base64,` + imagem

        const response = await blogData.postBlog(titulo, subtitulo, texto, dataUrl)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllBlogs = async () => {
    try {
        const response = await blogData.getAllBlogs()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getBlogById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do blog não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do blog não é válido')
        }

        const response = await blogData.getBlogById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateBlogById = async (id, field, value) => {
    try {
        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo de edição não preenchido')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor do campo de edição não preenchido')
        }

        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do blog não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do blog não é válido')
        }

        const blog = await blogData.getBlogById(id)
        if (!blog) {
            return new ResponseDTO('Error', 404, 'Blog com este identificador não encontrado')
        }

        blog[field] = value
        
        await blog.validate()
        await blog.save()

        const response = await blogData.getBlogById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteBlogById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do blog não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do blog não é válido')
        }

        const response = await blogData.deleteBlogById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await blogData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}
