const estatisticaJogadorCampeonatoService = require('../services/estatisticaJogadorCampeonatoService')

// exports.postEstatisticaJogadorCampeonato = async (req, res, next) => {
//     const { 
//         campeonatoId, teamId, jogadorId, gols, numeroCartoesAmarelo, numeroCartoesVermelho, punicao 
//     } = req.body

//     const response = await estatisticaJogadorCampeonatoService.postEstatisticaJogadorCampeonato(campeonatoId, teamId, jogadorId, gols, numeroCartoesAmarelo, numeroCartoesVermelho, punicao)

//     response.sendResponse(res)
// }

exports.getEstatisticaJogadorCampeonatoByTeamId = async (req, res, next) => {
    const { campeonatoId, teamId } = req.body
    const response = await estatisticaJogadorCampeonatoService.getEstatisticaJogadorCampeonatoByTeamId(campeonatoId, teamId)

    response.sendResponse(res)
}

exports.getEstatisticaJogadorCampeonatoByJogadorId = async (req, res, next) => {
    const { campeonatoId, jogadorId }   = req.body
    const response = await estatisticaJogadorCampeonatoService.getEstatisticaJogadorCampeonatoByJogadorId(campeonatoId, jogadorId)

    response.sendResponse(res)
}

exports.getEstatisticaJogadorByCampeonatoId = async (req, res, next) => {
    const { id } = req.params

    const response = await estatisticaJogadorCampeonatoService.getEstatisticaJogadorByCampeonatoId(id)

    response.sendResponse(res)
}

exports.getAllEstatisticaJogadorCampeonato = async (req, res, next) => {
    const response = await estatisticaJogadorCampeonatoService.getAllEstatisticaJogadorCampeonato()

    response.sendResponse(res)
}

exports.getEstatisticaJogadorCampeonatoById = async (req, res, next) => {
    const { id } = req.params
    const response = await estatisticaJogadorCampeonatoService.getEstatisticaJogadorCampeonatoById(id)

    response.sendResponse(res)
}

exports.updateEstatisticaJogadorCampeonatoById = async (req, res, next) => {
    const { id } = req.body
    const { field, value } = req.body

    const response = await estatisticaJogadorCampeonatoService.updateEstatisticaJogadorCampeonatoById(id, field, value)

    response.sendResponse(res)
}

exports.deleteEstatisticaJogadorCampeonatoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await estatisticaJogadorCampeonatoService.deleteEstatisticaJogadorCampeonatoById(id)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await estatisticaJogadorCampeonatoService.cleanDatabase()

    response.sendResponse(res)
}
