const secret          = process.env.SECRET
const { ResponseDTO } = require('../dtos/Response')
const ObjectId        = require('mongoose').Types.ObjectId;
const fotografoData   = require('../data/fotografoData')

exports.postFotografo = async (titulo, foto, nome, instagram) => {
    try {
        if (!titulo) {
            return new ResponseDTO('Error', 400, 'Título não preenchido')
        }

        if (!foto) {
            return new ResponseDTO('Error', 400, 'Foto não preenchida')
        }

        if (!nome) {
            return new ResponseDTO('Error', 400, 'Nome não preenchido')
        }

        if (!instagram) {
            return new ResponseDTO('Error', 400, 'Instagram não preenchido')
        }

        const response = await fotografoData.postFotografo(titulo, foto, nome, instagram)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }  
}

exports.getFotografoByNome = async (nome) => {
    try {
        if (!nome) {
            return new ResponseDTO('Error', 400, 'Nome do fotógrafo não preenchido')
        }

        const response = await fotografoData.getFotografoByNome(nome)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllFotografos = async () => {
    try {
        const response = await fotografoData.getAllFotografos()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    } 
}

exports.getFotografoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do fotógrafo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do fotógrafo não é válido')
        }

        const response = await fotografoData.getFotografoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }  
}

exports.updateFotografoById = async (id, field, value) => {
    try {
        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo de edição não preenchido')
        }

        if (!value) { 
            return new ResponseDTO('Error', 400, 'Valor do campo de edição não preenchido')
        }

        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do fotógrafo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do fotógrafo não é válido')
        }

        const fotografo = await fotografoData.getFotografoById(id)
        if (!fotografo) {
            return new ResponseDTO('Error', 404, 'Fotógrafo com este identificador não encontrado')
        }

        fotografo[field] = value
        
        await fotografo.validate()
        await fotografo.save()

        const response = await fotografoData.getFotografoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)


    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }  
}

exports.deleteFotografoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do fotógrafo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do fotógrafo não é válido')
        }

        const response = await fotografoData.deleteFotografoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }  
}

exports.cleanDatabase = async () => {
    try {
        const response = await fotografoData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }  
}

