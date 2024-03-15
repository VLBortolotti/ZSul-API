const campeonatoData = require('../data/campeonatoData')
const usersData  = require('../data/usersData')
const elencoData = require('../data/elencoData')
const sumulaData = require('../data/sumulaData')

const SumulaModel = require('../models/SumulaModel')
const ObjectId    = require('mongoose').Types.ObjectId
const { ResponseDTO } = require('../dtos/Response')

exports.postSumula = async (campeonatoId, userId, elencoId, status) => {
    try {
        if (!status) {
            return new ResponseDTO('Error', 400, 'O status do atleta na súmula não preenchido')
        }

        if (!campeonatoId) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não preenchida')
        }

        if (!ObjectId.isValid(campeonatoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const campeonato = await campeonatoData.getCampeonatoById(campeonatoId)
        if (!campeonato) {
            return new ResponseDTO('Success', 400, 'Campeonato com este identificador não existente')
        }

        if (!userId) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário (time) não preenchido')
        }

        if (!ObjectId.isValid(userId)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não é válido')
        }

        const user = await usersData.getUserById(userId)

        if (!user) {
            return new ResponseDTO('Error', 400, 'Usuário (time) com este identificador não existente')
        }

        if (!elencoId) {
            return new ResponseDTO('Error', 400, 'Atleta com este identificador não existente')
        }

        if (!ObjectId.isValid(elencoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do atleta não é válido')
        }

        const elenco = await elencoData.getAthleteById(elencoId)

        if (!elenco) {
            return new ResponseDTO('Error', 400, 'Atleta com este identificador não existente')
        }

        const checkIfSumulaExists = await sumulaData.checkIfSumulaExists(campeonatoId, userId, elencoId)

        if (checkIfSumulaExists.length !== 0) {
            return new ResponseDTO('Error', 400, 'Este atleta já foi cadastrado como membro da súmula deste time ')
        }

        const campeonatoName = campeonato.name
        const elencoName = elenco.name
        const userName   = user.teamName

        if (status == "ativo") {
            const sumulaCount = await sumulaData.countAllActiveSumulasByCampeonatoAndUserId(campeonatoId, userId)
        
            if (isNaN(sumulaCount)) {
                return new ResponseDTO('Error', 500, 'Não foi possível contar a quantidade de atletas na súmula')
            }

            if (sumulaCount >= 30) {
                return new ResponseDTO('Error', 400, 'A súmula de atletas ativos já atingiu o limite máximo (30)')
            }

            const response = await sumulaData.postSumula(campeonatoId, campeonatoName, userId, userName, elencoId, elencoName, status)

            return new ResponseDTO('Success', 200, 'ok', response)

        } else if (status == "banco"){
            const response = await sumulaData.postSumula(campeonatoId, campeonatoName, userId, userName, elencoId, elencoName, status)

            return new ResponseDTO('Success', 200, 'ok', response)

        } else {
            return new ResponseDTO('Error', 400, 'Status preenchido não é válido')
        }

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllSumulas = async () => {
    try {
        const response = await sumulaData.getAllSumulas()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getSumulaById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador da sumula não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da sumula não é válido')
        }
        
        const response = await sumulaData.getSumulaById(id)

        return new ResponseDTO('Success', 200, 'ok', response)
        
    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getSumulaByCampeonatoId = async (id) => {
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

        const response = await sumulaData.getSumulaByCampeonatoId(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getSumulaByTeamId = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const team = await usersData.getUserById(id)
        if (!team) {
            return new ResponseDTO('Error', 400, 'Usuário (time) com este identificador não existente')
        }

        const response = await sumulaData.getSumulaByTeamId(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getSumulaByElencoId = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const elenco = await elencoData.getAthleteById(id)
        if (!id) {
            return new ResponseDTO('Error', 400, 'Atleta com este identificador não existente')
        }

        const response = await sumulaData.getSumulaByElencoId(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.precoSumulaByTeamAndCampeonatoId = async (p1, p2, p3, teamId, campeonatoId) => {
    try {
        if (!p1) {
            return new ResponseDTO('Error', 400, 'Preço 1 não preenchido')
        }

        if (!p2) {
            return new ResponseDTO('Error', 400, 'Preço 2 não preenchido')
        }

        if (!p3) {
            return new ResponseDTO('Error', 400, 'Preço 3 não preenchido')
        }

        if (!campeonatoId) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não preenchido')
        }

        if (!ObjectId.isValid(campeonatoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const campeonato = await campeonatoData.getCampeonatoById(campeonatoId)
        if (!campeonato) {
            return new ResponseDTO('Error', 400, 'Campeonato com este identificador não existente')
        }

        if (!teamId) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário (time) não preenchido')
        }

        if (!ObjectId.isValid(teamId)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário (time) não é válido')
        }

        const team = await usersData.getUserById(teamId)
        if (!team) {
            return new ResponseDTO('Error', 400, 'Usuário (time) com este identificador não existente')
        }

        const sumulaCountActive = await sumulaData.countAllActiveSumulasByCampeonatoAndUserId(campeonatoId, teamId)
        if (!sumulaCountActive) {
            return new ResponseDTO('Error', 404, 'Não foi possível computar a quantidade de atletas ativos na súmula deste time')
        }

        console.log(`sumulaCountActive: ${sumulaCountActive}`)
        

        const allSumulaCount = await sumulaData.countAllSumulasByCampeonatoAndUserId(campeonatoId, teamId)
        if (!allSumulaCount) {
            return new ResponseDTO('Error', 404, 'Não foi possível computar a quantidade total de atletas na súmula deste time')
        }

        console.log(`allSumulaCount: ${allSumulaCount}`)

        const calcularPrecoSumulaExcedente = (sumulaCountActive) => {
            if (sumulaCountActive > 30) {
                return parseFloat(sumulaCountActive - 30)
            }
            return parseFloat(0)
        }
        const precoSumulaExcedente = calcularPrecoSumulaExcedente(sumulaCountActive)

        console.log(`precoSumulaExcedente: ${precoSumulaExcedente}`)

        const precoTotal = (allSumulaCount * parseFloat(p1)) + ( 19 - 30 * parseFloat(p2) ) + 
        ( precoSumulaExcedente * parseFloat(p3) )

        console.log(`preco total: ${precoTotal}`)

        const response = precoTotal

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateSumulaById = async (id, field, value) => {
    try {
        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo não preenchido')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor não preenchido')
        }

        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da sumula não é válido')
        }

        const sumula = await sumulaData.getSumulaById(id)
    
        if (!sumula) {
            return new ResponseDTO('Error', 400, 'Sumula com este identificador não existente')
        }

        const newSumula  = await SumulaModel.findOneAndUpdate({ _id: id }, { field: value })
        newSumula[field] = value

        await newSumula.save()

        return new ResponseDTO('Success', 200, 'ok', newSumula)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteSumulaById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da sumula não é válido')
        }

        const response = await sumulaData.deleteSumulaById(id)

        return new ResponseDTO('Success', 200, 'ok', response)
         
    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await sumulaData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}