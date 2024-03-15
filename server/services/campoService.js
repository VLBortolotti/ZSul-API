const secret          = process.env.SECRET
const { ResponseDTO } = require('../dtos/Response')
const ObjectId        = require('mongoose').Types.ObjectId
const campoData = require('../data/campoData')
const { link } = require('../routes/usersRoute')

exports.postCampo = async (nome, cidade, endereco, linkMaps) => {
    try {
        if (!nome) {
            return new ResponseDTO('Error', 400, 'Nome do campo não preenchido')
        }

        if (!cidade) {
            return new ResponseDTO('Error', 400, 'Cidade do campo não preenchido')
        }

        if (!endereco) {
            return new ResponseDTO('Error', 400, 'Endereço do campo não preenchido')
        }

        if (!linkMaps) {
            return new ResponseDTO('Error', 400, 'Link para o google maps não preenchido')
        }

        const response = await campoData.postCampo(nome, cidade, endereco, linkMaps)

        return new ResponseDTO('Error', 400, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllCampos = async () => {
    try {
        const response = await campoData.getAllCampos()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}