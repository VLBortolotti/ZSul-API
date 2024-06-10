const elencoPunicaoData = require('../data/elencoPunicaoData')
const elencoStatusData  = require('../data/elencoStatusData')
const campeonatoData    = require('../data/campeonatoData')
const elencoData        = require('../data/elencoData')
const usersData         = require('../data/usersData')
const { ResponseDTO } = require('../dtos/Response')
const ObjectId          = require('mongoose').Types.ObjectId

exports.postPunicao = async (teamId, elencoId, campeonatoId, punicao, descricao) => {
    try {
        if (!teamId) {
            return new ResponseDTO('Error', 400, 'Identificador do Time não preenchido')
        }

        if (!ObjectId.isValid(teamId)) {
            return new ResponseDTO('Error', 400, 'Identificador do Time não é válido')
        }

        const team = await usersData.getUserById(teamId)
        if (!team) {
            return new ResponseDTO('Error', 404, 'Time com este identificador não existente')
        }

        if (!elencoId) {
            return new ResponseDTO('Error', 400, 'Identificador do atleta não preenchido')
        }

        if (!ObjectId.isValid(elencoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do atleta não é válido')
        }

        const elenco = await elencoData.getAthleteById(elencoId)
        if (!elenco) {
            return new ResponseDTO('Error', 404, 'Atleta com este identificador não existente')
        }

        if (!campeonatoId) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não preenchido')
        }

        if (!ObjectId.isValid(campeonatoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const campeonato = await campeonatoData.getCampeonatoById(campeonatoId)
        if (!campeonato) {
            return new ResponseDTO('Error', 404, 'Campeonato com este identificador não existente')
        }

        if (!punicao) {
            return new ResponseDTO('Error', 400, 'Punição não preenchida')
        }

        const teamName   = team.teamName
        const elencoName = elenco.name
        const campeonatoName = campeonato.name

        const response = await elencoPunicaoData.postPunicao(teamId, teamName, campeonatoId, campeonatoName, elencoId, elencoName, punicao, descricao)

        return new ResponseDTO('Success', 200, 'ok', response)
        
    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllPunicao = async () => {
    try {
        const response = await elencoPunicaoData.getAllPunicao()

        return new ResponseDTO('Success', 200, 'ok', response)
        
    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getPunicaoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador da punição não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da punição não é válido')
        }

        const response = await elencoPunicaoData.getPunicaoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)
        
    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getPunicaoByTeamId = async (teamId) => {
    try {
        if (!teamId) {
            return new ResponseDTO('Error', 400, 'Identificador do Time não preenchido')
        }

        if (!ObjectId.isValid(teamId)) {
            return new ResponseDTO('Error', 400, 'Identificador do Time não é válido')
        }

        const team = await usersData.getUserById(teamId)
        if (!team) {
            return new ResponseDTO('Error', 404, 'Time com este identificador não existente')
        }

        const response = await elencoPunicaoData.getPunicaoByTeamId(teamId)

        return new ResponseDTO('Success', 200, 'ok', response)
        
    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getPunicaoByCampeonatoId = async (campeonatoId) => {
    try {
        if (!campeonatoId) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não preenchido')
        }

        if (!ObjectId.isValid(campeonatoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const campeonato = await campeonatoData.getCampeonatoById(campeonatoId)
        if (!campeonato) {
            return new ResponseDTO('Error', 404, 'Campeonato com este identificador não existente')
        }

        const response = await elencoPunicaoData.getPunicaoByCampeonatoId(campeonatoId)

        return new ResponseDTO('Success', 200, 'ok', response)
        
    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateAthleteById = async (id, field, value) => {
    try {
        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo não preenchido')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor não preenchido')
        }

        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador da punição não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da punição não é válido')
        }

        const elencoPunicao = await elencoPunicaoData.getPunicaoById(id)
        if (!elencoPunicao) {
            return new ResponseDTO('Error', 404, 'Punição não encontrada')
        }

        elencoPunicao[field] = value
        await elencoPunicao.save()

        const response = await elencoPunicaoData.getPunicaoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteAthleteById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador da punição não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da punição não é válido')
        }

        const response = await elencoPunicaoData.deleteAthleteById(id)

        return new ResponseDTO('Success', 200, 'ok', response)
        
    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await elencoPunicaoData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)
        
    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

