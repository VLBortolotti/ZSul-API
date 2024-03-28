const secret          = process.env.SECRET
const { ResponseDTO } = require('../dtos/Response')
const ObjectId        = require('mongoose').Types.ObjectId
const campoData  = require('../data/campoData')
const CampoModel = require('../models/CampoModel')

const path = require('path');
const fs   = require("fs")

exports.postCampo = async (nome, cidade, endereco, linkMaps, fileName, fileType, fileBase64) => {
    try {
        if (!nome) {
            return new ResponseDTO('Error', 400, 'Nome do campo não preenchido')
        }

        const campoByName = await campoData.getCampoByNome(nome)
        if (campoByName.length > 0) {
            return new ResponseDTO('Error', 400, 'Campo com este nome já cadastrado')
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

        console.log(`fileName: ${fileName}\nfileType: ${fileType}\nfileBase64: ${fileBase64}`)
        
        // if (image) {
        //     const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp']

        //     function isExtensionAllowed(extension) {
        //         return allowedExtensions.includes(extension);
        //     }

        //     const imageExtension = path.extname(image.path)

        //     if (isExtensionAllowed(imageExtension)) {
        //         const data = fs.readFileSync(image.path)
        //         const pictureBase64 = `data:image/png;base64,${data.toString('base64')}`
        //         const pictureName   = `${image.filename}`
    
        //         const response = await campoData.postCampo(nome, cidade, endereco, linkMaps, pictureName, pictureBase64)
    
        //         return new ResponseDTO('Error', 200, 'ok', response)

        //     } else {
        //         return new ResponseDTO('Error', 400, `Extensão da imagem não permitida (${imageExtension})`)
        //     }

        // } else {
        //     const response = await campoData.postCampo(nome, cidade, endereco, linkMaps)

        //     return new ResponseDTO('Error', 200, 'ok', response)
        // }    

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
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do campo não foi preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do campo não é válido')
        }

        const campo = await campoData.getCampoById(id)
        if (!campo) {
            return new ResponseDTO('Error', 404, 'Campo com este identificador não encontrado')
        }

        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo que deseja-se atualizar não preenchido')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor do campo que deseja-se atualizar não preenchido')
        }

        campo[field] = value
        await campo.save()

        const response = await campoData.getCampoById(id) 

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteCampoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do campo não foi preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do campo não é válido')
        }

        const campo = await campoData.getCampoById(id)
        if (!campo) {
            return new ResponseDTO('Error', 404, 'Campo com este identificador não encontrado')
        }

        const response = await campoData.deleteCampoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await campoData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
} 