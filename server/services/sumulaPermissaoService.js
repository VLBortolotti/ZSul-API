const estatisticaJogadorCampeonatoData = require('../data/estatisticaJogadorCampeonatoData')
const sumulaPermissaoData = require('../data/sumulaPermissaoData')
const campeonatoData = require('../data/campeonatoData')
const usersData  = require('../data/usersData')
const elencoData = require('../data/elencoData')
const sumulaData = require('../data/sumulaData')

const SumulaModel = require('../models/SumulaModel')
const ObjectId    = require('mongoose').Types.ObjectId
const { ResponseDTO } = require('../dtos/Response')

exports.aprovarSumulaPermissaoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 404, 'Identificador da permissão da súmula não enviado')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da permissão da súmula não é válido')
        }

        // Verificando se essa sumula permissao existe
        const sumulaPermissao = await sumulaPermissaoData.getSumulaPermissaoById(id)
        if (!sumulaPermissao) {
            return new ResponseDTO('Success', 400, 'Campeonato com este identificador não existente')
        }

        // const response = await sumulaData.postSumula(campeonatoId, campeonatoName, userId, userName, elencoId, elencoName, elencoDocumento, 'banco')
        const campeonatoId    = sumulaPermissao.campeonatoId
        const campeonatoName  = sumulaPermissao.campeonatoName
        const elencoDocumento = sumulaPermissao.elencoDocumento
        const userName   = sumulaPermissao.userName
        const userId     = sumulaPermissao.userId
        const elencoId   = sumulaPermissao.elencoId
        const elencoName = sumulaPermissao.elencoName

        // console.log(campeonatoId, campeonatoName, userId, userName, elencoId, elencoName, elencoDocumento)
        const response = await sumulaData.postSumula(campeonatoId, campeonatoName, userId, userName, elencoId, elencoName, elencoDocumento, 'banco')

        await sumulaPermissaoData.deletarSumulaPermissaoById(id)

        await estatisticaJogadorCampeonatoData.postEstatisticaJogadorCampeonato(campeonatoId, userId, userName, elencoId, elencoName, '0', '0', '0', '')

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllSumulasPermissao = async () => {
    try {
        const response = await sumulaPermissaoData.getAllSumulasPermissao()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.reprovarSumulaPermissaoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 404, 'Identificador da permissão da súmula não enviado')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da permissão da súmula não é válido')
        }

        const response = await sumulaPermissaoData.deletarSumulaPermissaoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await sumulaPermissaoData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}