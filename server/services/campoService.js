const secret          = process.env.SECRET
const { ResponseDTO } = require('../dtos/Response')
const ObjectId        = require('mongoose').Types.ObjectId
const campoData = require('../data/campoData')

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

exports.getCampoByCidade = async (cidade) => {
    try {
        if (!cidade) {
            return new ResponseDTO('Error', 400, 'Cidade não preenchida')
        }

        const response = await campoData.getCampoByCidade(cidade)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getCampoByNome = async (nome) => {
    try {
        if (!nome) {
            return new ResponseDTO('Error', 400, 'Nome do campo não preenchido')
        }

        const response = await campoData.getCampoByNome(nome)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getCampoByEndereco = async (endereco) => {
    try {
        if (!endereco) {
            return new ResponseDTO('Error', 400, 'Endereço do campo não preenchido')
        }

        const response = await campoData.getCampoByEndereco(endereco)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getCampoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do campo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do campo não é válido')
        }

        const campo = await campoData.getCampoById(id)
        if (!campo) {
            return new ResponseDTO('Error', 404, 'Campo com este identificador não encontrado')
        }

        return new ResponseDTO('Success', 200, 'ok', campo)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateCampoById = async (id, field, value) => {
    try {

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}