const transferenciaData = require('../data/transferenciaData')
const campeonatoData    = require('../data/campeonatoData')
const elencoData = require('../data/elencoData')
const usersData  = require('../data/usersData')
const sumulaData = require('../data/sumulaData')

const elencoService = require('../services/elencoService')

const TransferenciaModel = require('../models/TransferenciaModel')

const ObjectId = require('mongoose').Types.ObjectId
const { ResponseDTO } = require('../dtos/Response')

exports.postTransferencia = async (jogadorId, novoTimeId, motivo, dataDeSolicitacao) => {
    try {
        if (!motivo) {
            return new ResponseDTO('Error', 400, 'Motivo não preenchido')
        }

        if (!dataDeSolicitacao) {
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

        const response = await transferenciaData.postTransferencia(jogadorId, jogadorNome, jogadorTimeId, jogadorNomeTime, novoTimeId, motivo, dataDeSolicitacao)

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

        // const sumulaTimeAtual = await sumulaData.getSumulaByElencoIdCampeonatoIdUserId(jogadorId, campeonatoId, timeAtualId)

        // console.log(`sumulaTimeAtual: ${sumulaTimeAtual}`)

        // const sumulaTimeNovo = await sumulaData.getSumulaByCampeonatoUserId(jogadorId, campeonatoId, novoTimeId)

        // Aprovando a transferência

        // Mover o jogador de um time para outro
        const jogadorName     = jogador.name
        const jogadorNasc     = jogador.dateOfBirth
        const jogadorSchool   = jogador.school
        const jogadorCategory = jogador.category
        const jogadorCertidao = jogador.certidaoNascimento
        const jogadorRG  = jogador.RG
        const jogadorCPF = jogador.CPF 
        let jogadorDocument   = null

        if (jogador.RG) {
            jogadorDocument = jogador.RG
        } else if (jogador.CPF) {
            jogadorDocument = jogador.CPF
        } else if (jogador.certidaoNascimento) {
            jogadorDocument = jogador.certidaoNascimento
        }
        
        console.log(`\nTestando transferência...\nJogador: ${JSON.stringify(jogador)}\n\n`)
        console.log(`\njogadorName: ${jogadorName}\njogadorNasc: ${jogadorNasc}\njogadorSchool: ${jogadorSchool}\njogadorCategory: ${jogadorCategory}\njogadorDocument: ${jogadorDocument}`)

        // console.log(sumulaTimeAtual)

        // Salvar atleta no novo time
        // verificar se response.msg == "Success"
        const response1 = await elencoService.postAthlete(novoTimeId, jogadorName, jogadorNasc, jogadorRG, jogadorCPF, jogadorCertidao, jogadorSchool, jogadorCategory)
        
        // Deletar jogador do time antigo
        const response2 = await elencoService.deleteAthleteById(jogadorId)

        // Deletar atleta da súmula do time antigo
        const response3 = await sumulaData.deleteSumulaByElencoIdAndUserId(jogadorId, timeAtualId)

        // Deletar transferência
        const response4 = await transferenciaData.reprovarTransferenciaById(id)

        // console.log(`response1: ${response1}`)

        return new ResponseDTO('Success', 200, 'ok', response1)

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