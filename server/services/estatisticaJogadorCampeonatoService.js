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

exports.postEstatisticaJogadorCampeonato = async (campeonatoId, teamId, jogadorId, gols, numeroCartoesAmarelo, numeroCartoesVermelho, punicao) => {
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
        
        if (!teamId) {
            return new ResponseDTO('Error', 400, 'Identificador do time não preenchido')
        }

        if (!ObjectId.isValid(teamId)) {
            return new ResponseDTO('Error', 400, 'Identificador do time não é válido')
        }

        const time = await usersData.getUserById(teamId)
        if (!time) {
            return new ResponseDTO('Error', 400, 'Campeonato com este identificador não existente')
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

        const campeonatoName = campeonato['name']
        const jogadorName = jogador['name']
        const teamName = time['teamName']

        const estatisticaJogadorCampeonato = await estatisticaJogadorCampeonatoData.getEstatisticaJogadorCampeonatoByCampeonatoIdAndJogadorId(campeonatoId, jogadorId)
        // console.log(Object.keys(estatisticaJogadorCampeonato).length)
        if (estatisticaJogadorCampeonato) {
            // pegar os dados da estatistica
            // salvar um novo com os dados atualizados
            // deletar pelo _id
            
            newEstatisticaPunicao = punicao
            newEstatisticaGols = parseInt(estatisticaJogadorCampeonato.gols) + parseInt(gols)
            
            newEstatisticaNumeroCartoesAmarelo  = parseInt(estatisticaJogadorCampeonato.numeroCartoesAmarelo) + parseInt(numeroCartoesAmarelo)
            
            newEstatisticaNumeroCartoesVermelho = parseInt(estatisticaJogadorCampeonato.numeroCartoesVermelho) + parseInt(numeroCartoesVermelho)
            
            // deletando antiga estatisticaJogadorCampeonatoId
            const estatisticaJogadorCampeonatoId = estatisticaJogadorCampeonato._id
            // console.log(`estatisticaJogadorCampeonatoId: ${estatisticaJogadorCampeonatoId[0]}`)
            await estatisticaJogadorCampeonatoData.deleteEstatisticaJogadorCampeonatoById(estatisticaJogadorCampeonatoId)
            
            // criando uma nova estatisticaJogadorCampeonatoId
            const response2 = await estatisticaJogadorCampeonatoData.postEstatisticaJogadorCampeonato(campeonatoId, campeonatoName, teamId, teamName, jogadorId, jogadorName, newEstatisticaGols, newEstatisticaNumeroCartoesAmarelo, newEstatisticaNumeroCartoesVermelho, punicao)

            return new ResponseDTO('Success', 200, 'ok', response2)

        } else if (!estatisticaJogadorCampeonato) {
            const response2 = await estatisticaJogadorCampeonatoData.postEstatisticaJogadorCampeonato(campeonatoId, campeonatoName, teamId, teamName, jogadorId, jogadorName, gols, numeroCartoesAmarelo, numeroCartoesVermelho, punicao)

            return new ResponseDTO('Success', 200, 'ok', response2)
        }

        // const response = await estatisticaJogadorCampeonatoData.postEstatisticaJogadorCampeonato(campeonatoId, campeonatoName, teamId, teamName, jogadorId, jogadorName, gols, numeroCartoesAmarelo, numeroCartoesVermelho, punicao)


    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

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

exports.updateEstatisticaJogadorCampeonatoById = async (field, value, campeonatoId, jogadorId) => {
    try {
        if (!campeonatoId) {
            return ResponseDTO('Error', 400, 'Identificador do campeonato não preenchido')
        }

        if (!ObjectId.isValid(campeonatoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const campeonato = await campeonatoData.getCampeonatoById(campeonatoId)
        if (!campeonato) {
            return new ResponseDTO('Error', 404, 'Campeonato com este identificador não existente')
        }

        if (!jogadorId) {
            return ResponseDTO('Error', 400, 'Identificador do jogador não preenchido')
        }

        if (!ObjectId.isValid(jogadorId)) {
            return new ResponseDTO('Error', 400, 'Identificador do jogador não é válido')
        }

        const jogador = await elencoData.getAthleteById(jogadorId)
        if (!jogador) {
            return new ResponseDTO('Error', 404, 'Jogador com este identificador não existente')
        }

        if (!field) {
            return ResponseDTO('Error', 400, 'Campo não preenchido')
        }

        if (!value) {
            return ResponseDTO('Error', 400, 'Valor não preenchido')
        }

        const estatisticaJogadorCampeonato = await estatisticaJogadorCampeonatoData.getEstatisticaJogadorCampeonatoByCampeonatoIdAndJogadorId(campeonatoId, jogadorId)

        if (!estatisticaJogadorCampeonato) {
            const teamId   = jogador.teamId
            const team     = await usersData.getUserById(teamId) 
            const teamName = team.teamName

            const campeonatoName = campeonato.name
            const jogadorName    = jogador.name
            
            if (field == 'punicao') {
                const response = await estatisticaJogadorCampeonatoData.postEstatisticaJogadorCampeonato(campeonatoId, campeonatoName, teamId, teamName, jogadorId, jogadorName, '0', '0', '0', value)

                return new ResponseDTO('Success', 200, 'ok', response)

            } else {
                const response = await estatisticaJogadorCampeonatoData.postEstatisticaJogadorCampeonato(campeonatoId, campeonatoName, teamId, teamName, jogadorId, jogadorName, '0', '0', '0', '')

                return new ResponseDTO('Success', 200, 'ok', response)
            }
            
        }

        estatisticaJogadorCampeonato[field] = value
        estatisticaJogadorCampeonato.save()

        const response = await estatisticaJogadorCampeonatoData.getEstatisticaJogadorCampeonatoByCampeonatoIdAndJogadorId(campeonatoId, jogadorId)

        return new ResponseDTO('Success', 200, 'ok', response)

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
