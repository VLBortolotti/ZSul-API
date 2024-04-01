const secret          = process.env.SECRET
const bcrypt          = require('bcrypt')
const jwt             = require('jsonwebtoken')
const { ResponseDTO } = require('../dtos/Response')
const ObjectId        = require('mongoose').Types.ObjectId;
const campeonatoData  = require('../data/campeonatoData')
const fs = require('fs')

exports.postCampeonato = async (name, categoria, participantes, vagas, quantidadeGrupos, dataInicio, cidade, tipoCompeticao, file, fileType) => {
    try {
        if (!name) {
            return new ResponseDTO('Error', 400, 'Nome não preenchido')
        }

        if (await campeonatoData.getCampeonatoByName(name)) {
            return new ResponseDTO('Success', 400, 'Este nome já foi pêgo')
        }

        if (!categoria) {
            return new ResponseDTO('Error', 400, 'Categoria não preenchida')
        }

        if (!participantes) {
            return new ResponseDTO('Error', 400, 'Participantes não preenchido')
        }

        if (!vagas) {
            return new ResponseDTO('Error', 400, 'Vagas não preenchida')
        }

        if (!quantidadeGrupos) {
            return new ResponseDTO('Error', 400, 'Quantidade de grupos não preenchida')
        }

        if (!dataInicio) {
            return new ResponseDTO('Error', 400, 'Data início não preenchida')
        }

        if (!cidade) {
            return new ResponseDTO('Error', 400, 'Cidade não preenchida')
        }

        if (!tipoCompeticao) {
            return new ResponseDTO('Error', 400, 'Tipo competição não preenchido')
        }

        if (file && fileType) {
            const pictureBase64 = `data:image/${fileType};base64,` + file
        
            const response = await campeonatoData.postCampeonato(name, categoria, participantes, vagas, quantidadeGrupos, dataInicio, cidade, tipoCompeticao, pictureBase64)
            
            return new ResponseDTO('Success', 200, 'ok', response)

        } else {
            const response = await campeonatoData.postCampeonato(name, categoria, participantes, vagas, quantidadeGrupos, dataInicio, cidade, tipoCompeticao)
            
            return new ResponseDTO('Success', 200, 'ok', response)
        }

        // if (image) {    
        //     const data = fs.readFileSync(image.path)
        //     const pictureBase64 = `data:image/png;base64,${data.toString('base64')}`
        //     const pictureName   = `${image.filename}`

        //     const response = await campeonatoData.postCampeonato(name, categoria, participantes, vagas, quantidadeGrupos, dataInicio, cidade, tipoCompeticao, tipoGrupo, tipoMataMata, pictureName, pictureBase64)

        //     return new ResponseDTO('Success', 200, 'ok', response)

        // } else {
        //     const response = await campeonatoData.postCampeonato(name, categoria, participantes, vagas, quantidadeGrupos, dataInicio, cidade, tipoCompeticao, tipoGrupo, tipoMataMata)

        //     return new ResponseDTO('Success', 200, 'ok', response)
        // }

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllCampeonatos = async () => {
    try {
        const response = await campeonatoData.getAllCampeonatos()
        
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getCampeonatoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const response = await campeonatoData.getCampeonatoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateCampeonatoById = async (id, field, value) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo não preenchido')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor não preenchido')
        }

        const campeonato = await campeonatoData.getCampeonatoById(id)

        if (!campeonato) {
            return new ResponseDTO('Error', 404, 'Campeonato com este identificador não encontrado')
        }

        campeonato[field] = value
        
        await campeonato.validate()
        await campeonato.save()

        const response = await campeonatoData.getCampeonatoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteCampeonatoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const campeonato = await campeonatoData.getCampeonatoById(id)

        if (!campeonato) {
            return new ResponseDTO('Error', 404, 'Campeonato com este identificador não encontrado')
        }

        const response = await campeonatoData.deleteCampeonatoById(id) 

        if (response.acknowledged == true && response.deletedCount !== 0) {
            return new ResponseDTO('Success', 200, 'ok', response)
        } else {
            return new ResponseDTO('Error', 500, 'O campeonato não pôde ser deletado')
        }

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await campeonatoData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
} 