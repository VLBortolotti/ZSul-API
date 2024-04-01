const transferenciaData = require('../data/transferenciaData')
const elencoData = require('../data/elencoData')
const usersData  = require('../data/usersData')
const sumulaData = require('../data/sumulaData')
const campeonatoData = require('../data/campeonatoData')

const elencoService = require('../services/elencoService')

const ObjectId = require('mongoose').Types.ObjectId
const { ResponseDTO } = require('../dtos/Response')
const TransferenciaModel = require('../models/TransferenciaModel')

exports.postTransferencia = async (jogadorId, novoTimeId, campeonatoId, motivo, dataDeSolicitcao) => {
    try {
        if (!motivo) {
            return new ResponseDTO('Error', 400, 'Motivo não preenchido')
        }

        if (!dataDeSolicitcao) {
            return new ResponseDTO('Error', 400, 'Data de solicitação não preenchido')
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

        if (!novoTimeId) {
            return new ResponseDTO('Error', 400, 'Identificador do novo time não preenchido')
        }

        if (!ObjectId.isValid(novoTimeId)) {
            return new ResponseDTO('Error', 400, 'Identificador do novo time não é válido')
        }

        const novoTime = await usersData.getUserById(novoTimeId)
        if (!novoTime) {
            return new ResponseDTO('Error', 400, 'Time com este identificador não existente')
        }

        if (!jogadorId) {
            return new ResponseDTO('Error', 400, 'O identificador do jogador não foi preenchido')
        }

        if (!ObjectId.isValid(jogadorId)) {
            return new ResponseDTO('Error', 400, 'Identificador do jogador não é válido')
        }

        const jogador = await elencoData.getAthleteById(jogadorId)
        if (!jogador) {
            return new ResponseDTO('Error', 400, 'Jogador com este identificador não encontrado')
        }

        const jogadorTimeAtual = jogador.teamId
        const jogadorTime      = await usersData.getUserById(jogadorTimeAtual)
        const jogadorTimeId    = jogadorTime._id
        const jogadorNomeTime  = jogadorTime.teamName
        const jogadorNome      = jogador.name

        const response = await transferenciaData.postTransferencia(campeonatoId, jogadorId, jogadorNome, jogadorTimeId, jogadorNomeTime, novoTimeId, motivo, dataDeSolicitcao)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.aprovarTransferenciaById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador da transferência não preenchida')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da transferência não é válido')
        }

        const transferencia = await transferenciaData.getTransferenciaById(id)
        if (!transferencia) {
            return new ResponseDTO('Success', 400, 'Transferência com este identificador não existente')
        }

        // Verificando se o jogador ainda existe
        const jogadorId = transferencia.jogadorId
        if (!jogadorId) {
            return new ResponseDTO('Error', 400, 'Identificador do jogador não encontrado')
        }
        
        const jogador = await elencoData.getAthleteById(jogadorId)
        if (!jogador) {
            return new ResponseDTO('Error', 404, 'Jogador com este identificador não encontrado')
        }

        // Verificando se o time atual ainda existe
        const timeAtualId = transferencia.timeAtualId
        if (!timeAtualId) {
            return new ResponseDTO('Error', 400, 'Identificador do time atual não encontrado')
        }

        const timeAtual = await usersData.getUserById(timeAtualId)
        if (!timeAtual) {
            return new ResponseDTO('Error', 404, 'Time atual não encontrado')
        }

        // Verificando se o novo time ainda existe
        const novoTimeId = transferencia.novoTimeId
        if (!novoTimeId) {
            return new ResponseDTO('Error', 400, 'Identificador do novo time não encontrado')
        }

        const novoTime = await usersData.getUserById(novoTimeId)
        if (!novoTime) {
            return new ResponseDTO('Error', 404, 'Novo time não encontrado')
        }

        // Verificando se o campeonato ainda existe
        const campeonatoId = transferencia.campeonatoId
        if (!campeonatoId) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não encontrado')
        }

        const campeonato = await campeonatoData.getCampeonatoById(campeonatoId)
        if (!campeonato) {
            return new ResponseDTO('Error', 404, 'Campeonato com este identificador não existente')
        }

        // Aprovando a transferência

        // Mover o jogador de um time para outro
        await elencoService.postAthlete(novoTimeId, jogador.name, jogador.dateOfBirth, jogador.documentNumber, jogador.school, jogador.category)

        // Mover o jogador de uma sumula para outra

        // Deletar jogador da sumula do time antigo

        // Deletar jogador do time antigo


    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllTransferencias = async () => {
    try {
        const response = await transferenciaData.getAllTransferencias()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.reprovarTransferenciaById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador da transferência não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da transferência não é válido')
        }

        const transferencia = await transferenciaData.getTransferenciaById(id)
        if (!transferencia) {
            return new ResponseDTO('Error', 400, 'Transferência com este identificador não encontrada')
        }

        await transferenciaData.reprovarTransferenciaById(id)
        const response = await transferenciaData.getAllTransferencias()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await transferenciaData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', res)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}