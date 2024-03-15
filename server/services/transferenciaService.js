const transferenciaData = require('../data/transferenciaData')
const elencoData = require('../data/elencoData')
const usersData  = require('../data/usersData')

const ObjectId = require('mongoose').Types.ObjectId
const { ResponseDTO } = require('../dtos/Response')
const TransferenciaModel = require('../models/TransferenciaModel')

exports.postTransferencia = async (jogadorId, novoTimeId, motivo, dataDeSolicitcao) => {
    try {
        if (!motivo) {
            return new ResponseDTO('Error', 400, 'Motivo não preenchido')
        }

        if (!dataDeSolicitcao) {
            return new ResponseDTO('Error', 400, 'Data de solicitação não preenchido')
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

        const response = await transferenciaData.postTransferencia(jogadorId, jogadorNome, jogadorTimeId, jogadorNomeTime, novoTimeId, motivo, dataDeSolicitcao)

        return new ResponseDTO('Success', 200, 'ok', response)

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

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}