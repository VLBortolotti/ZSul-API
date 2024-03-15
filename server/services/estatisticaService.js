const estatisticaJogadorData = require('../data/estatisticaJogadorData')
const inscricoesData  = require('../data/inscricoesData')
const estatisticaData = require('../data/estatisticaData')
const campeonatoData  = require('../data/campeonatoData')
const jogosData = require('../data/jogosData')
const usersData = require('../data/usersData')

const ObjectId = require('mongoose').Types.ObjectId
const { ResponseDTO } = require('../dtos/Response')

const EstatisticaModel = require('../models/EstatisticaJogoModel')
const InscricaoModel   = require('../models/InscricaoModel')
const UserModel        = require('../models/UserModel')

exports.postEstatistica = async (campeonatoId, jogoId, userCasaGols, userForaGols) => {
    try {
        if (!campeonatoId) {
            return new ResponseDTO('Error', 400, 'Campeonato com este identificador não preenchido')
        }

        if (!ObjectId.isValid(campeonatoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const campeonato = await campeonatoData.getCampeonatoById(campeonatoId)
        if (!campeonato) {
            return new ResponseDTO('Error', 400, 'Campeonato com este identificador não existente')
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

        if (!userCasaGols) {
            return new ResponseDTO('Error', 400, 'Quantidade de gols realizados pelo time da casa não preenchido')
        }

        if (isNaN(userCasaGols) == true) {
            return new ResponseDTO('Error', 400, 'A quantidade de gols realizados pelo time da casa não é um número válido.')
        }

        if (!userForaGols) {
            return new ResponseDTO('Error', 400, 'Quantidade de gols realizados pelo time de fora da casa não preenchido')
        }

        if (isNaN(userForaGols) == true) {
            return new ResponseDTO('Error', 400, 'A quantidade de gols realizados pelo time de fora da casa não é um número válido.')
        }

        const userIdCasa    = jogo.userIdCasa
        const userCasa      = await usersData.getUserById(userIdCasa)
        const userCasaNome  = userCasa.teamName
        const inscricaoCasa = await inscricoesData.getInscricaoByUserIdAndCampeonatoId(userIdCasa, campeonatoId)

        if (!inscricaoCasa) {
            return new ResponseDTO('Error', 404, 'O usuário (time) da casa não está cadastrado neste campeonato')
        }

        const userIdFora   = jogo.userIdFora
        const userFora     = await usersData.getUserById(userIdFora)
        const userForaNome = userFora.teamName
        const inscricaoFora = await inscricoesData.getInscricaoByUserIdAndCampeonatoId(userIdFora, campeonatoId)

        if (!inscricaoFora) {
            return new ResponseDTO('Error', 404, 'Esse usuário (time) de fora não está cadastrado neste campeonato')
        }

        userCasa['golsSofridos'] += parseInt(userForaGols)
        userCasa['numeroJogos']  += parseInt(1)
        userCasa['golsFeitos']   += parseInt(userCasaGols)
        userCasa['saldoGols']     = parseInt(userCasa['golsFeitos']) - parseInt(userCasa['golsSofridos'])
        inscricaoCasa['golsSofridos'] += parseInt(userCasaGols)
        inscricaoCasa['numeroJogos']  += parseInt(1)
        inscricaoCasa['golsFeitos']   += parseInt(userCasaGols)
        inscricaoCasa['saldoGols']     = parseInt(inscricaoCasa['golsFeitos']) - parseInt(inscricaoCasa['golsSofridos'])

        userFora['golsSofridos'] += parseInt(userCasaGols)
        userFora['numeroJogos']  += parseInt(1)
        userFora['golsFeitos']   += parseInt(userForaGols)
        userFora['saldoGols']     = parseInt(userFora['golsFeitos']) - parseInt(userFora['golsSofridos'])
        inscricaoFora['golsSofridos'] += parseInt(userCasaGols)
        inscricaoFora['numeroJogos']  += parseInt(1)
        inscricaoFora['golsFeitos']   += parseInt(userForaGols)
        inscricaoFora['saldoGols']     = parseInt(inscricaoFora['golsFeitos']) - parseInt(inscricaoFora['golsSofridos'])

        await userCasa.save()
        await inscricaoCasa.save()
        await userFora.save()
        await inscricaoFora.save()

        if (userCasaGols > userForaGols) {
            userCasa['vitorias'] += parseInt(1)
            inscricaoCasa['vitorias'] += parseInt(1)
            userFora['derrotas'] += parseInt(1)
            inscricaoFora['derrotas'] += parseInt(1)

            userCasa['pontos'] = (userCasa['vitorias']) * 3 + (userCasa['empates']) * 1
            inscricaoCasa['pontos'] = (inscricaoCasa['vitorias']) * 3 + (inscricaoCasa['empates']) * 1
            userFora['pontos'] = (userFora['vitorias']) * 3 + (userFora['empates']) * 1
            inscricaoFora['pontos'] = (inscricaoFora['vitorias']) * 3 + (inscricaoFora['empates']) * 1
            
            await userCasa.save()
            await inscricaoCasa.save()
            await userFora.save()
            await inscricaoFora.save()

            const response = await estatisticaData.postEstatistica(campeonatoId, jogoId, userIdCasa, userIdCasa, userCasaNome, userCasaGols, userIdFora, userForaNome, userForaGols)

            return new ResponseDTO('Success', 200, 'ok', response)

        } else if (userCasaGols < userForaGols) {
            userCasa['derrotas'] += parseInt(1)
            inscricaoCasa['derrotas'] += parseInt(1)
            userFora['vitorias'] += parseInt(1)
            inscricaoFora['vitorias'] += parseInt(1)

            userCasa['pontos'] = (userCasa['vitorias']) * 3 + (userCasa['empates']) * 1
            inscricaoCasa['pontos'] = (inscricaoCasa['vitorias']) * 3 + (inscricaoCasa['empates']) * 1
            userFora['pontos'] = (userFora['vitorias']) * 3 + (userFora['empates']) * 1
            inscricaoFora['pontos'] = (inscricaoFora['vitorias']) * 3 + (inscricaoFora['empates']) * 1
            
            await userCasa.save()
            await inscricaoCasa.save()
            await userFora.save()
            await inscricaoFora.save()

            const response = await estatisticaData.postEstatistica(campeonatoId, jogoId, userIdFora,userIdCasa, userCasaNome, userCasaGols, userIdFora, userForaNome, userForaGols)

            return new ResponseDTO('Success', 200, 'ok', response)

        } else if (userCasaGols == userForaGols) {
            userCasa['empates'] += parseInt(1)
            inscricaoCasa['empates'] += parseInt(1)
            userFora['empates'] += parseInt(1)
            inscricaoFora['empates'] += parseInt(1)

            userCasa['pontos'] = (userCasa['vitorias']) * 3 + (userCasa['empates']) * 1
            inscricaoCasa['pontos'] = (inscricaoCasa['vitorias']) * 3 + (inscricaoCasa['empates']) * 1
            userFora['pontos'] = (userFora['vitorias']) * 3 + (userFora['empates']) * 1
            inscricaoFora['pontos'] = (inscricaoFora['vitorias']) * 3 + (inscricaoFora['empates']) * 1
            
            await userCasa.save()
            await inscricaoCasa.save()
            await userFora.save()
            await inscricaoFora.save()

            const response = await estatisticaData.postEstatistica(campeonatoId, jogoId, "empate", userIdCasa, userCasaNome, userCasaGols, userIdFora, userForaNome, userForaGols)

            return new ResponseDTO('Success', 200, 'ok', response)
        }

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getEstatisticaById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador da estatística não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador da estatística não é válido')
        }

        const response = await estatisticaData.getEstatisticaById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllEstatisticas = async () => {
    try {
        const response = await estatisticaData.getAllEstatisticas()

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

        const estatisticaJogo = await estatisticaData.getEstatisticaJogoById(id)
        if (!estatisticaJogo) {
            return new ResponseDTO('Error', 400, 'Estatística de jogo com este identificador não existente')
        }

        const userIdCasa = jogo.userIdCasa
        const userIdFora = jogo.userIdFora

        const estatisticaJogadorCasa = await estatisticaJogadorData.getAllEstatisticasByTeamId(userIdCasa, id)
        const estatisticaJogadorFora = await estatisticaJogadorData.getAllEstatisticasByTeamId(userIdFora, id)

        return new ResponseDTO('Success', 200, 'ok', [estatisticaJogo, estatisticaJogadorCasa, estatisticaJogadorFora])

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getEstatisticaTeamById = async (campeonatoId, teamId) => {
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

        const team = await usersData.getUserById(teamId)
        if (!team) {
            return new ResponseDTO('Error', 400, 'Time com este identificador não existente')
        }

        const response = await estatisticaData.getEstatisticaTeamById(campeonatoId, teamId)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateEstatisticaById = async (id, field, value) => {
    try {
        if (!field) {
            return new ResponseDTO('Error', 400, 'O campo não foi preenchido')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'O valor não foi preenchido')
        }

        if (!id) {
            return new ResponseDTO('Error', 400, 'O identificador da estatística não foi preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do time não é válido')
        }

        const estatistica = await estatisticaData.getEstatisticaById(id)
        if (!estatistica) {
            return new ResponseDTO('Error', 400, 'Estatística com este identificador não existente')
        }

        const newEstatistica  = await EstatisticaModel.findOneAndUpdate({ _id: id }, { field: value })
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
            return new ResponseDTO('Error', 400, 'Identificador do jogo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não é válido')
        }

        const estatisticaJogo = await estatisticaData.getEstatisticaJogoById(id)
        if (!estatisticaJogo) {
            return new ResponseDTO('Error', 400, 'Estatística de jogo com este identificador não existente')
        }

        const response = await estatisticaData.deleteEstatisticaById(id)

        return new ResponseDTO('Success', 200, 'ok', response)


    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await estatisticaData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}