const EstatisticaJogadorModel = require('../models/EstatisticaJogadorModel')
const estatisticaJogadorData  = require('../data/estatisticaJogadorData')

const EstatisticaJogadorCampeonatoModel = require('../models/EstatisticaJogadorCampeonatoModel')
const estatisticaJogadorCampeonatoData  = require('../data/estatisticaJogadorCampeonatoData')

const campeonatoData = require('../data/campeonatoData')
const jogosData  = require('../data/jogosData')
const usersData  = require('../data/usersData')
const elencoData = require('../data/elencoData')

const ObjectId = require('mongoose').Types.ObjectId
const { ResponseDTO } = require('../dtos/Response')

// exports.postEstatisticaJogadorCampeonato = async (campeonatoId, teamId, jogadorId, gols, numeroCartoesAmarelo, numeroCartoesVermelho, punicao) => {
//     try {
//         if (!campeonatoId) {
//             return new ResponseDTO('Error', 400, 'Identificador do campeonato não preenchido')
//         }

//         if (!ObjectId.isValid(campeonatoId)) {
//             return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
//         }

//         const campeonato = await campeonatoData.getCampeonatoById(campeonatoId)
//         if (!campeonato) {
//             return new ResponseDTO('Error', 400, 'Campeonato com este identificador não existente')
//         }
        
//     } catch (error) {
//         console.log(`Erro: ${error}`)
//         return new ResponseDTO('Error', 500, 'Erro no servidor')
//     }
// }

exports.getAllEstatisticaJogadorCampeonato = async () => {
    try {
        const response = await estatisticaJogadorCampeonatoData.getAllEstatisticaJogadorCampeonato()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getEstatisticaJogadorCampeonatoByTeamId = async (campeonatoId, teamId) => {
    try {
        if (!teamId) {
            return new ResponseDTO('Error', 400, 'Identificador do time (usuário) não preenchido')
        }

        if (!ObjectId.isValid(teamId)) {
            return new ResponseDTO('Error', 400, 'Identificador do time (usuário) não é válido')
        }

        const team = await usersData.getUserById(teamId)
        if (!team) {
            return new ResponseDTO('Error', 400, 'Time (usuário) com este identificador não existente')
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

        const response = await estatisticaJogadorCampeonatoData.getEstatisticaJogadorCampeonatoByTeamId(teamId, campeonatoId)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getEstatisticaJogadorCampeonatoByJogadorId = async (campeonatoId, jogadorId) => {
    try {
        if (!jogadorId) {
            return new ResponseDTO('Error', 400, 'Identificador do jogador não preenchido')
        }

        if (!ObjectId.isValid(jogadorId)) {
            return new ResponseDTO('Error', 400, 'Identificador do jogador não é válido')
        }

        const jogador = await elencoData.getAthleteById(jogadorId)
        if (!jogador) {
            return new ResponseDTO('Error', 400, 'Jogador com este identificador não existente')
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

        const response = await estatisticaJogadorCampeonatoData.getEstatisticaJogadorCampeonatoByCampeonatoIdAndJogadorId(campeonatoId, jogadorId)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getEstatisticaJogadorByCampeonatoId = async (campeonatoId) => {
    try {
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

        const response = await estatisticaJogadorCampeonatoData.getEstatisticaJogadorCampeonatoByCampeonatoId(campeonatoId)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getEstatisticaJogadorCampeonatoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador da estatística não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da estatística não é válido')
        }

        const response = await estatisticaJogadorCampeonatoData.getEstatisticaJogadorCampeonatoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateEstatisticaJogadorCampeonatoById = async () => {
    try {

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteEstatisticaJogadorCampeonatoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador da estatística não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da estatística não é válido')
        }

        const response = await estatisticaJogadorCampeonatoData.deleteEstatisticaJogadorCampeonatoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await estatisticaJogadorCampeonatoData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}
