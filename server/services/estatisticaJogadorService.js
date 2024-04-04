const EstatisticaJogadorModel = require('../models/EstatisticaJogadorModel')
const estatisticaJogadorData  = require('../data/estatisticaJogadorData')
const campeonatoData = require('../data/campeonatoData')
const jogosData  = require('../data/jogosData')
const usersData  = require('../data/usersData')
const elencoData = require('../data/elencoData')

const ObjectId = require('mongoose').Types.ObjectId
const { ResponseDTO } = require('../dtos/Response')

exports.postEstatisticaJogador = async (campeonatoId, jogoId, teamId, jogadorId, gols, numeroCartoesAmarelo, numeroCartoesVermelho, punicao) => {
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

        if (!jogoId) {
            return new ResponseDTO('Error', 400, 'Identificador do jogador não preenchido')
        }

        if (!ObjectId.isValid(jogoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não é válido')
        }

        const jogo = await jogosData.getJogoById(jogoId)
        if (!jogo) {
            return new ResponseDTO('Error', 400, 'Jogo com este identificador não existente')
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

        if (!gols) {
            return new ResponseDTO('Error', 400, 'Quantidade de gols realizados pelo jogador não preenchido')
        }

        if (!numeroCartoesAmarelo) {
            return new ResponseDTO('Error', 400, 'Quantidade de cartões amarelo recebidos por este jogador não preenchido')
        }
        
        if (!numeroCartoesVermelho) {
            return new ResponseDTO('Error', 400, 'Quantidade de cartões vermelho recebidos por este jogador não preenchido')
        }

        const campeonatoName = campeonato.name
        const jogadorName = jogador.name
        const teamName = team.teamName

        const response = await estatisticaJogadorData.postEstatisticaJogador(campeonatoId, campeonatoName, jogoId, teamId, teamName, jogadorId, jogadorName, gols, numeroCartoesAmarelo, numeroCartoesVermelho, punicao)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllEstatisticasByTeamId = async (teamId, jogoId) => {
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

        if (!jogoId) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não preenchido')
        }

        if (!ObjectId.isValid(jogoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não é válido')
        }

        const jogo = await jogosData.getJogoById(jogoId)
        if (!jogo) {
            return new ResponseDTO('Error', 400, 'Jogo com este identificador não existente')
        }

        const response = await estatisticaJogadorData.getAllEstatisticasByTeamId(teamId, jogoId)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getEstatisticaJogadorById = async (jogadorId, jogoId) => {
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

        if (!jogoId) {
            return new ResponseDTO('Error', 400, 'Identificador do jogador não preenchido')
        }

        if (!ObjectId.isValid(jogoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não é válido')
        }

        const jogo = await jogosData.getJogoById(jogoId)
        if (!jogo) {
            return new ResponseDTO('Error', 400, 'Jogo com este identificador não existente')
        }

        const response = await estatisticaJogadorData.getEstatisticaJogadorById(jogadorId, jogoId)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllEstatisticaByJogadorId = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do jogador não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do jogador não é válido')
        }

        const jogador = await elencoData.getAthleteById(id)
        if (!jogador) {
            return new ResponseDTO('Error', 400, 'Jogador com este identificador não existente')
        }
        
        const response = await estatisticaJogadorData.getAllEstatisticaByJogadorId(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllEstatisticas = async () => {
    try {
        const response = await estatisticaJogadorData.getAllEstatisticas()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getEstatisticaJogoById = async (id) => {
    try {
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
        
        const userIdCasa = jogo.userIdCasa
        if (!userIdCasa) {
            return new ResponseDTO('Error', 404, 'Identificador do time da casa não encontrado')
        }

        const userIdFora = jogo.userIdFora
        if (!userIdFora) {
            return new ResponseDTO('Error', 404, 'Identificador do time da fora não encontrado')
        }

        const estatisticaJogadoresCasa = await estatisticaJogadorData.getAllEstatisticasByTeamId(userIdCasa, id)
        if (!estatisticaJogadoresCasa) {
            return new ResponseDTO('Error', 500, 'Não foi possível pegar as estatísticas dos jogadores da casa')
        }

        const estatisticaJogadoresFora = await estatisticaJogadorData.getAllEstatisticasByTeamId(userIdFora, id)
        if (!estatisticaJogadoresFora) {
            return new ResponseDTO('Error', 500, 'Não foi possível pegar as estatísticas dos jogadores de fora')
        }

        const response = [jogo, estatisticaJogadoresCasa, estatisticaJogadoresFora]

        return new ResponseDTO('Success', 200, 'ok', response)


    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getEstatisticaJogadorByCampeonatoId = async (id) => {
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
        
        const response = await estatisticaJogadorData.getEstatisticaJogadorByCampeonatoId(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllEstatisticasJogadoresPunidos = async () => {
    try {
        const response = await estatisticaJogadorData.getAllEstatisticasJogadoresPunidos()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateEstatisticaById = async (id, field, value) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador da estatística do jogador não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da estatística do jogador não é válido')
        }

        const estatisticaJogador = await estatisticaJogadorData.getEstatisticaById(id)
        if (!estatisticaJogador) {
            return new ResponseDTO('Error', 400, 'Jogador com este identificador não existente')
        }

        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo não preenchido')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor não preenchido')
        }

        const newEstatistica  = await EstatisticaJogadorModel.findOneAndUpdate({ _id: id }, { field: value })
        newEstatistica[field] = value

        await newEstatistica.save()

        return new ResponseDTO('Success', 200, 'ok', newEstatistica)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteEstatisticaById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador da estatística do jogador não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da estatística do jogador não é válido')
        }

        const response = await estatisticaJogadorData.deleteEstatisticaById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await estatisticaJogadorData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}