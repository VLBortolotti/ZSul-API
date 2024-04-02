const campeonatoData = require('../data/campeonatoData')
const jogosData = require('../data/jogosData')
const usersData = require('../data/usersData')
const grupoData = require('../data/grupoData')
const campoData = require('../data/campoData')

const JogoModel = require('../models/JogoModel')
const ObjectId  = require('mongoose').Types.ObjectId
const { ResponseDTO } = require('../dtos/Response')

exports.postJogo = async (campeonatoId, userIdCasa, userIdFora, grupoId, tipo, data, hora, campoId) => {
    try {
        if (!campeonatoId) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não preenchida')
        }

        if (!ObjectId.isValid(campeonatoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const campeonato = await campeonatoData.getCampeonatoById(campeonatoId) 
        if (!campeonato) {
            return new ResponseDTO('Error', 400, 'Campeonato com este identificador não existente')
        }

        if (!userIdCasa) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário (time) da casa não preenchida')
        }

        if (!ObjectId.isValid(userIdCasa)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário (time) de casa não é válido')
        }

        const userCasa = await usersData.getUserById(userIdCasa)
        if (!userCasa) {
            return new ResponseDTO('Error', 400, 'Usuário (time) com este identificador não existente')
        }

        if (!userIdFora) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário (time) de fora não preenchido')
        }

        if (!ObjectId.isValid(userIdFora)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário (time) de fora não é válido')
        }

        const userFora = await usersData.getUserById(userIdFora)
        if (!userFora) {
            return new ResponseDTO('Error', 400, 'Usuário (time) com este identificador não existente')
        }

        if (!grupoId) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não preenchido')
        }

        if (!ObjectId.isValid(grupoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não é válido')
        }

        const grupo = await grupoData.getGrupoById(grupoId)
        if (Object.keys(grupo).length == 0) {
            return new ResponseDTO('Error', 400, 'Grupo com este identificador não existentes')
        }

        if (!tipo) {
            return new ResponseDTO('Error', 400, 'Tipo não preenchido')
        }

        if (!data) {
            return new ResponseDTO('Error', 400, 'Data não preenchida')
        }

        if (!hora) {
            return new ResponseDTO('Error', 400, 'Hora não preenchida')
        }

        if (!campoId) {
            return new ResponseDTO('Error', 400, 'Identificador do campo não preenchido')
        }

        if (!ObjectId.isValid(campoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do campo não é válido')
        }

        const campo = await campoData.getCampoById(campoId)
        if (!campo) {
            return new ResponseDTO('Error', 400, 'Campo com este identificador não existente')
        }

        const campeonatoName = campeonato.name
        if(!campeonatoName) {
            return new ResponseDTO('Error', 404, 'O nome do campeonato não foi encontrado')
        }

        const userCasaName = userCasa.teamName
        if(!userCasaName) {
            return new ResponseDTO('Error', 404, 'O nome do time da casa não foi encontrado')
        }

        const userForaName = userFora.teamName
        if(!userForaName) {
            return new ResponseDTO('Error', 404, 'O nome do time de fora não foi encontrado')
        }

        const response = await jogosData.postJogo(campeonatoId, campeonatoName, userIdCasa, userCasaName, userIdFora, userForaName, grupoId, tipo, data, hora, campoId)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllJogos = async () => {
    try {
        const response = await jogosData.getAllJogos()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getJogoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não é válido')
        }

        const jogo = await jogosData.getJogoById(id)
        if (!jogo) {
            return new ResponseDTO('Error', 404, 'Jogo com este identificador não encontrado')
        }

        const campoId = jogo.campoId
        const campo   = await campoData.getCampoById(campoId)

        return new ResponseDTO('Success', 200, 'ok', [jogo, campo])

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getJogoCampeonatoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }
        
        const campeonato = await campeonatoData.getCampeonatoById(id)
        if (!campeonato) {
            return new ResponseDTO('Error', 400, 'Campeonato com este identificador não existente')
        }

        const response = await jogosData.getJogoCampeonatoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getJogoGrupoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não é válido')
        }

        const grupo = await grupoData.getGrupoById(id)
        if (!grupo) {
            return new ResponseDTO('Success', 200, 'ok', response)
        }

        const response = await jogosData.getJogoGrupoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getJogoTeamById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não é válido')
        }

        const team = await usersData.getUserById(id)
        if (!team) {
            return new ResponseDTO('Success', 200, 'ok', response)
        }

        const response = await jogosData.getJogoTeamById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateJogoById = async (id, field, value) => {
    try {
        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo não preenchido')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor não preenchido')
        }
        
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não é válido')
        }

        const jogo = await jogosData.getJogoById(id)
        if (!jogo) {
            return new ResponseDTO('Error', 400, 'Jogo com este identificador não existente')
        }

        const newJogo  = await JogoModel.findOneAndUpdate({ _id: id }, { field: value })
        newJogo[field] = value

        await newJogo.save()

        return new ResponseDTO('Success', 200, 'ok', newJogo)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteJogoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não é válido')
        }

        const response = await jogosData.deleteJogoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await jogosData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}