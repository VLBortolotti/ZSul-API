const estatisticaJogadorCampeonatoData = require('../data/estatisticaJogadorCampeonatoData')
const estatisticaJogadorData = require('../data/estatisticaJogadorData')
const estatisticaData = require('../data/estatisticaData')
const inscricoesData  = require('../data/inscricoesData')
const campeonatoData  = require('../data/campeonatoData')
const jogosData = require('../data/jogosData')
const usersData = require('../data/usersData')
const grupoData = require('../data/grupoData')
const campoData = require('../data/campoData')

const JogoModel = require('../models/JogoModel')
const ObjectId  = require('mongoose').Types.ObjectId
const { ResponseDTO } = require('../dtos/Response')

exports.postJogo = async (campeonatoId, userIdCasa, userIdFora, grupoId, tipo, data, hora, campoId) => {
    try {
        if (!campeonatoId) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não preenchida')
        }

        if (!ObjectId.isValid(campeonatoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const campeonato = await campeonatoData.getCampeonatoById(campeonatoId) 
        if (!campeonato) {
            return new ResponseDTO('Error', 400, 'Campeonato com este identificador não existente')
        }

        if (!userIdCasa) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário (time) da casa não preenchida')
        }

        if (!ObjectId.isValid(userIdCasa)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário (time) de casa não é válido')
        }

        const userCasa = await usersData.getUserById(userIdCasa)
        if (!userCasa) {
            return new ResponseDTO('Error', 400, 'Usuário (time) com este identificador não existente')
        }

        if (!userIdFora) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário (time) de fora não preenchido')
        }

        if (!ObjectId.isValid(userIdFora)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário (time) de fora não é válido')
        }

        const userFora = await usersData.getUserById(userIdFora)
        if (!userFora) {
            return new ResponseDTO('Error', 400, 'Usuário (time) com este identificador não existente')
        }

        if (!grupoId) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não preenchido')
        }

        if (!ObjectId.isValid(grupoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não é válido')
        }

        const grupo = await grupoData.getGrupoById(grupoId)
        if (Object.keys(grupo).length == 0) {
            return new ResponseDTO('Error', 400, 'Grupo com este identificador não existentes')
        }

        if (!tipo) {
            return new ResponseDTO('Error', 400, 'Tipo não preenchido')
        }

        if (!data) {
            return new ResponseDTO('Error', 400, 'Data não preenchida')
        }

        if (!hora) {
            return new ResponseDTO('Error', 400, 'Hora não preenchida')
        }

        if (!campoId) {
            return new ResponseDTO('Error', 400, 'Identificador do campo não preenchido')
        }

        if (!ObjectId.isValid(campoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do campo não é válido')
        }

        const campo = await campoData.getCampoById(campoId)
        if (!campo) {
            return new ResponseDTO('Error', 400, 'Campo com este identificador não existente')
        }

        const campeonatoName = campeonato.name
        if(!campeonatoName) {
            return new ResponseDTO('Error', 404, 'O nome do campeonato não foi encontrado')
        }

        const userCasaName = userCasa.teamName
        if(!userCasaName) {
            return new ResponseDTO('Error', 404, 'O nome do time da casa não foi encontrado')
        }

        const userForaName = userFora.teamName
        if(!userForaName) {
            return new ResponseDTO('Error', 404, 'O nome do time de fora não foi encontrado')
        }

        const response = await jogosData.postJogo(campeonatoId, campeonatoName, userIdCasa, userCasaName, userIdFora, userForaName, grupoId, tipo, data, hora, campoId)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllJogos = async () => {
    try {
        const response = await jogosData.getAllJogos()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getJogoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não é válido')
        }

        const jogo = await jogosData.getJogoById(id)
        if (!jogo) {
            return new ResponseDTO('Error', 404, 'Jogo com este identificador não encontrado')
        }

        const campoId = jogo.campoId
        const campo   = await campoData.getCampoById(campoId)

        return new ResponseDTO('Success', 200, 'ok', [jogo, campo])

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getJogoCampeonatoById = async (id) => {
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

        const response = await jogosData.getJogoCampeonatoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getJogoGrupoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não é válido')
        }

        const grupo = await grupoData.getGrupoById(id)
        if (!grupo) {
            return new ResponseDTO('Success', 200, 'ok', response)
        }

        const response = await jogosData.getJogoGrupoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getJogoTeamById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não é válido')
        }

        const team = await usersData.getUserById(id)
        if (!team) {
            return new ResponseDTO('Success', 200, 'ok', response)
        }

        const response = await jogosData.getJogoTeamById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateJogoById = async (id, field, value) => {
    try {
        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo não preenchido')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor não preenchido')
        }
        
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

        const newJogo  = await JogoModel.findOneAndUpdate({ _id: id }, { field: value })
        newJogo[field] = value

        await newJogo.save()

        return new ResponseDTO('Success', 200, 'ok', newJogo)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteJogoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do jogo não é válido')
        }

        const jogo = await jogosData.getJogoById(id)
        if (!jogo) {
            return new ResponseDTO('Error', 404, 'Jogo com este identificador não encontrado')
        }

        const campeonatoId = jogo.campeonatoId

        const estatisticaJogo = await estatisticaData.getEstatisticaJogoById(id)
        const jogoVencedorId  = estatisticaJogo['vencedor']

        const userCasaId = jogo['userIdCasa']
        const userCasa   = await usersData.getUserById(userCasaId)
        
        const userForaId = jogo['userIdFora']
        const userFora   = await usersData.getUserById(userForaId)
        
        const inscricaoCasa = await inscricoesData.getInscricoesByUserId(userCasaId)
        const inscricaoFora = await inscricoesData.getInscricoesByUserId(userForaId)
        
        // Verificando qual time ganhou (casa, fora ou empate)
        if (jogoVencedorId == userForaId) {
            userFora['numeroJogos'] = parseInt(userFora['numeroJogos']) - 1
            userFora['vitorias'] = parseInt(userFora['vitorias']) - 1
            userFora['golsFeitos'] = parseInt(userFora['golsFeitos']) - parseInt(estatisticaJogo['userForaGols'])
            userFora['golsSofridos'] = parseInt(userFora['golsSofridos']) - parseInt(estatisticaJogo['userCasaGols'])
            userFora['saldoGols'] = parseInt(userFora['golsFeitos']) - parseInt(userFora['golsSofridos'])
            userFora['pontos'] = ( parseInt(userFora['vitorias']) * 3 ) + parseInt(userFora['empates']) 

            inscricaoFora['numeroJogos'] = parseInt(inscricaoFora['numeroJogos']) - 1
            inscricaoFora['vitorias'] = parseInt(inscricaoFora['vitorias']) - 1
            inscricaoFora['golsFeitos'] = parseInt(inscricaoFora['golsFeitos']) - parseInt(estatisticaJogo['userForaGols'])
            inscricaoFora['golsSofridos'] = parseInt(inscricaoFora['golsSofridos']) - parseInt(estatisticaJogo['userCasaGols'])
            inscricaoFora['saldoGols'] = parseInt(inscricaoFora['golsFeitos']) - parseInt(inscricaoFora['golsSofridos'])
            inscricaoFora['pontos'] = ( parseInt(inscricaoFora['vitorias']) * 3 ) + parseInt(inscricaoFora['empates'])

            userCasa['numeroJogos'] = parseInt(userCasa['numeroJogos']) - 1
            userCasa['derrotas'] = parseInt(userCasa['derrotas']) - 1
            userCasa['golsFeitos'] = parseInt(userCasa['golsFeitos']) - parseInt(estatisticaJogo['userCasaGols'])
            userCasa['golsSofridos'] = parseInt(userCasa['golsSofridos']) - parseInt(estatisticaJogo['userForaGols'])
            userCasa['saldoGols'] = parseInt(userCasa['golsFeitos']) - parseInt(userCasa['golsSofridos'])
            userCasa['pontos'] = ( parseInt(userCasa['vitorias']) * 3 ) + parseInt(userCasa['empates'])

            inscricaoCasa['numeroJogos'] = parseInt(inscricaoCasa['numeroJogos']) - 1
            inscricaoCasa['derrotas'] = parseInt(inscricaoCasa['derrotas']) - 1
            inscricaoCasa['golsFeitos'] = parseInt(inscricaoCasa['golsFeitos']) - parseInt(estatisticaJogo['userCasaGols'])
            inscricaoCasa['golsSofridos'] = parseInt(inscricaoCasa['golsSofridos']) - parseInt(estatisticaJogo['userForaGols'])
            inscricaoCasa['saldoGols'] = parseInt(inscricaoCasa['golsFeitos']) - parseInt(inscricaoCasa['golsSofridos'])
            inscricaoCasa['pontos'] = ( parseInt(inscricaoCasa['vitorias']) * 3 ) + parseInt(inscricaoCasa['empates'])

            await userFora.save()
            await inscricaoFora.save()
            await userCasa.save()
            await inscricaoCasa.save()

        } else if (jogoVencedorId == userCasaId) {
            userFora['numeroJogos'] = parseInt(userFora['numeroJogos']) - 1
            userFora['derrotas'] = parseInt(userFora['derrotas']) - 1
            userFora['golsFeitos'] = parseInt(userFora['golsFeitos']) - parseInt(estatisticaJogo['userForaGols'])
            userFora['golsSofridos'] = parseInt(userFora['golsSofridos']) - parseInt(estatisticaJogo['userCasaGols'])
            userFora['saldoGols'] = parseInt(userFora['golsFeitos']) - parseInt(userFora['golsSofridos'])
            userFora['pontos'] = ( parseInt(userFora['vitorias']) * 3 ) + parseInt(userFora['empates'])
            
            inscricaoFora['numeroJogos'] = parseInt(inscricaoFora['numeroJogos']) - 1
            inscricaoFora['derrotas'] = parseInt(inscricaoFora['derrotas']) - 1
            inscricaoFora['golsFeitos'] = parseInt(inscricaoFora['golsFeitos']) - parseInt(estatisticaJogo['userForaGols'])
            inscricaoFora['golsSofridos'] = parseInt(inscricaoFora['golsSofridos']) - parseInt(estatisticaJogo['userCasaGols'])
            inscricaoFora['saldoGols'] = parseInt(inscricaoFora['golsFeitos']) - parseInt(inscricaoFora['golsSofridos'])
            inscricaoFora['pontos'] = ( parseInt(inscricaoFora['vitorias']) * 3 ) + parseInt(inscricaoFora['empates'])
                    
            userCasa['numeroJogos'] = parseInt(userCasa['numeroJogos']) - 1
            userCasa['vitorias'] = parseInt(userCasa['vitorias']) - 1
            userCasa['golsFeitos'] = parseInt(userCasa['golsFeitos']) - parseInt(estatisticaJogo['userCasaGols'])
            userCasa['golsSofridos'] = parseInt(userCasa['golsSofridos']) - parseInt(estatisticaJogo['userForaGols'])
            userCasa['saldoGols'] = parseInt(userCasa['golsFeitos']) - parseInt(userCasa['golsSofridos'])
            userCasa['pontos'] = ( parseInt(userCasa['vitorias']) * 3 ) + parseInt(userCasa['empates'])

            inscricaoCasa['numeroJogos'] = parseInt(inscricaoCasa['numeroJogos']) - 1
            inscricaoCasa['vitorias'] = parseInt(inscricaoCasa['vitorias']) - 1
            inscricaoCasa['golsFeitos'] = parseInt(inscricaoCasa['golsFeitos']) - parseInt(estatisticaJogo['userCasaGols'])
            inscricaoCasa['golsSofridos'] = parseInt(inscricaoCasa['golsSofridos']) - parseInt(estatisticaJogo['userForaGols'])
            inscricaoCasa['saldoGols'] = parseInt(inscricaoCasa['golsFeitos']) - parseInt(inscricaoCasa['golsSofridos'])
            inscricaoCasa['pontos'] = ( parseInt(inscricaoCasa['vitorias']) * 3 ) + parseInt(inscricaoCasa['empates'])

            await userFora.save()
            await inscricaoFora.save()
            await userCasa.save()
            await inscricaoCasa.save()

        } else if (jogoVencedorId == 'empate') {
            userFora['numeroJogos'] = parseInt(userFora['numeroJogos']) - 1
            userFora['empates'] = parseInt(userFora['empates']) - 1
            userFora['golsFeitos'] = parseInt(userFora['golsFeitos']) - parseInt(estatisticaJogo['userForaGols'])
            userFora['golsSofridos'] = parseInt(userFora['golsSofridos']) - parseInt(estatisticaJogo['userCasaGols'])
            userFora['saldoGols'] = parseInt(userFora['golsFeitos']) - parseInt(userFora['golsSofridos'])
            userFora['pontos'] = ( parseInt(userFora['vitorias']) * 3 ) + parseInt(userFora['empates'])
            
            inscricaoFora['numeroJogos'] = parseInt(inscricaoFora['numeroJogos']) - 1
            inscricaoFora['empates'] = parseInt(inscricaoFora['empates']) - 1
            inscricaoFora['golsFeitos'] = parseInt(inscricaoFora['golsFeitos']) - parseInt(estatisticaJogo['userForaGols'])
            inscricaoFora['golsSofridos'] = parseInt(inscricaoFora['golsSofridos']) - parseInt(estatisticaJogo['userCasaGols'])
            inscricaoFora['saldoGols'] = parseInt(inscricaoFora['golsFeitos']) - parseInt(inscricaoFora['golsSofridos'])
            inscricaoFora['pontos'] = ( parseInt(inscricaoFora['vitorias']) * 3 ) + parseInt(inscricaoFora['empates']) 

            userCasa['numeroJogos'] = parseInt(userCasa['numeroJogos']) - 1
            userCasa['empates'] = parseInt(userCasa['empates']) - 1
            userCasa['golsFeitos'] = parseInt(userCasa['golsFeitos']) - parseInt(estatisticaJogo['userCasaGols'])
            userCasa['golsSofridos'] = parseInt(userCasa['golsSofridos']) - parseInt(estatisticaJogo['userForaGols'])
            userCasa['saldoGols'] = parseInt(userCasa['golsFeitos']) - parseInt(userCasa['golsSofridos'])
            userCasa['pontos'] = ( parseInt(userCasa['vitorias']) * 3 ) + parseInt(userCasa['empates'])

            inscricaoCasa['numeroJogos'] = parseInt(inscricaoCasa['numeroJogos']) - 1
            inscricaoCasa['empates'] = parseInt(inscricaoCasa['empates']) - 1
            inscricaoCasa['golsFeitos'] = parseInt(inscricaoCasa['golsFeitos']) - parseInt(estatisticaJogo['userCasaGols'])
            inscricaoCasa['golsSofridos'] = parseInt(inscricaoCasa['golsSofridos']) - parseInt(estatisticaJogo['userForaGols'])
            inscricaoCasa['saldoGols'] = parseInt(inscricaoCasa['golsFeitos']) - parseInt(inscricaoCasa['golsSofridos'])
            inscricaoCasa['pontos'] = ( parseInt(inscricaoCasa['vitorias']) * 3 ) + parseInt(inscricaoCasa['empates'])

            await userFora.save()
            await inscricaoFora.save()
            await userCasa.save()
            await inscricaoCasa.save()

        } else {
            return new ResponseDTO('Error', 404, 'Não foi possível encontrar qual jogador ganhou essa partida, portanto não é possível atualizar as estatísticas')
        }

        // Atualizando a estatistica dos jogadores nos CAMPEONATOS
        const jogadoresCasa = await estatisticaJogadorData.getAllEstatisticasByTeamId(userCasaId, id)
        const jogadoresFora = await estatisticaJogadorData.getAllEstatisticasByTeamId(userForaId, id)

        for (const jogador of jogadoresCasa) {
            const jogadorId = jogador.jogadorId
            console.log(`\njogadoresCasa antes: ${jogadoresCasa}`)
            const estatisticaJogador = await estatisticaJogadorCampeonatoData.getEstatisticaJogadorCampeonatoByCampeonatoIdAndJogadorId(campeonatoId, jogadorId)

            estatisticaJogador['gols'] = parseInt(estatisticaJogador['gols']) - parseInt(jogador['gols'])
            estatisticaJogador['numeroCartoesAmarelo'] = parseInt(estatisticaJogador['numeroCartoesAmarelo']) - parseInt(jogador['numeroCartoesAmarelo'])
            estatisticaJogador['numeroCartoesVermelho'] = parseInt(estatisticaJogador['numeroCartoesVermelho']) - parseInt(jogador['numeroCartoesVermelho'])

            await estatisticaJogador.save()
            console.log(`jogadoresCasa depois: ${estatisticaJogador}\n`)
        }
        
        for (const jogador of jogadoresFora) {
            const jogadorId = jogador.jogadorId
            console.log(`\njogadoresFora antes: ${jogadoresFora}`)
            const estatisticaJogador = await estatisticaJogadorCampeonatoData.getEstatisticaJogadorCampeonatoByCampeonatoIdAndJogadorId(campeonatoId, jogadorId)

            estatisticaJogador['gols'] = parseInt(estatisticaJogador['gols']) - parseInt(jogador['gols'])
            estatisticaJogador['numeroCartoesAmarelo'] = parseInt(estatisticaJogador['numeroCartoesAmarelo']) - parseInt(jogador['numeroCartoesAmarelo'])
            estatisticaJogador['numeroCartoesVermelho'] = parseInt(estatisticaJogador['numeroCartoesVermelho']) - parseInt(jogador['numeroCartoesVermelho'])

            await estatisticaJogador.save()
            console.log(`\njogadoresFora depois: ${estatisticaJogador}`)
        }

        // const response = [jogoVencedorId, estatisticaJogo, userFora, userCasa]
        
        const response  = await jogosData.deleteJogoById(id)
        const response2 = await estatisticaJogadorData.deleteAllEstatisticaJogadorByJogoId(id)

        return new ResponseDTO('Success', 200, 'ok', [response, response2])

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await jogosData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}