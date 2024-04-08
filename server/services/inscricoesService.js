const inscricoesData  = require('../data/inscricoesData')
const usersData       = require('../data/usersData')
const campeonatoData  = require('../data/campeonatoData')
const ObjectId        = require('mongoose').Types.ObjectId;
const { ResponseDTO } = require('../dtos/Response')

const CampeonatoModel = require('../models/CampeonatoModel')

exports.postInscricao = async (userId, campeonatoId) => {
    try {
        if (!userId) {
            return new ResponseDTO('Error', 404, 'Identificador do usuário não preenchido')
        }

        if (!ObjectId.isValid(userId)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não é válido')
        }

        const user = await usersData.getUserById(userId)
        if (!user) {
            return new ResponseDTO('Error', 400, 'Usuário com este identificador não existente')
        }

        if (!campeonatoId) {
            return new ResponseDTO('Error', 404, 'Identificador do campeonato não preenchido')
        }
        
        if (!ObjectId.isValid(campeonatoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const campeonato = await campeonatoData.getCampeonatoById(campeonatoId)
        if (!campeonato) {
            return new ResponseDTO('Error', 400, 'Campeonato com este identificador não existente')
        }

        if (await inscricoesData.getInscricaoByUserIdAndCampeonatoId(userId, campeonatoId)) {
            return new ResponseDTO('Error', 400, 'Usuário já inscrito neste campeonato')
        }

        if (campeonato.vagas <= 0) {
            return new ResponseDTO('Error', 400, 'Este campeonato já não possui mais vagas')
        }

        const userName = user.teamName
        const campeonatoName = campeonato.name
        
        campeonato['vagas'] = parseFloat(campeonato['vagas']) - parseFloat(1)
        campeonato['participantes'] = parseFloat(campeonato['participantes']) + parseFloat(1)
        await campeonato.save()

        const response = await inscricoesData.postInscricao(userId, userName, campeonatoId, campeonatoName)
        
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllInscricoes = async () => {
    try {
        const response = await inscricoesData.getAllInscricoes()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getInscricaoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador da inscrição não preenchida')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da inscrição não é válida')
        }
    
        const response = await inscricoesData.getInscricaoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getInscricoesByCampeonatoId = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 404, 'Identificador do campeonato não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const response = await inscricoesData.getInscricoesByCampeonatoId(id)
        
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getInscricoesByUserId = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 404, 'Identificador do usuário não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não é válido')
        }

        const response = await inscricoesData.getInscricoesByUserId(id)
        
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateInscricaoById = async (id, field, value) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador da inscrição não preenchida')
        }
    
        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da inscrição não é válida')
        }
    
        const inscricao = await inscricoesData.getInscricaoById(id)
        if (!inscricao) {
            return new ResponseDTO('Error', 404, 'Inscrição com este identificador não existente')
        }
    
        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo que deseja-se atualizar não preenchido')
        }
    
        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor que deseja-se atualizar não preenchido')
        }
    
        inscricao[field] = value
        inscricao.save()
    
        const response = await inscricoesData.getInscricaoById(id)
    
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteInscricaoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador da inscrição não preenchida')
        }
    
        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da inscrição não é válida')
        }
    
        const inscricao = await inscricoesData.getInscricaoById(id)
        if (!inscricao) {
            return new ResponseDTO('Error', 404, 'Inscrição com este identificador não existente')
        }

        const campeonatoId = inscricao.campeonatoId
        if (!campeonatoId) {
            return new ResponseDTO('Error', 404, 'Não foi possível encontrar o identificador do campeonato desta inscrição')
        }

        const campeonato = await campeonatoData.getCampeonatoById(campeonatoId)
        if (!campeonato) {
            return new ResponseDTO('Error', 404, 'Não foi possível encontrar o campeonato desta inscrição')
        }

        const response = await inscricoesData.deleteInscricaoById(id)
        campeonato.participantes = parseInt(campeonato.participantes) - 1
        campeonato.vagas = parseInt(campeonato.vagas) + 1

        await campeonato.save()
        
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await inscricoesData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}