const EstatisticaJogador = require('../models/EstatisticaJogadorModel')

exports.postEstatisticaJogador = async (campeonatoId, campeonatoName, jogoId, teamId, teamName, jogadorId, jogadorName, gols, numeroCartoesAmarelo, numeroCartoesVermelho, punicao) => {
    const estatisticaJogador = new EstatisticaJogador({
        campeonatoId, campeonatoName, jogoId, teamId, teamName, jogadorId, jogadorName, gols, numeroCartoesAmarelo, numeroCartoesVermelho, punicao
    })

    return await estatisticaJogador.save()
}

exports.getAllEstatisticasByJogoId = async (jogoId) => {
    return await EstatisticaJogador.find({ jogoId: jogoId }, '-__v')
}

exports.getAllEstatisticasByTeamId = async (teamId, jogoId) => {
    return await EstatisticaJogador.find({ teamId: teamId, jogoId: jogoId }, '-__v')
}

exports.getEstatisticaJogadorById = async (jogadorId, jogoId) => {
    return await EstatisticaJogador.find({ jogadorId: jogadorId, jogoId: jogoId }, '-__v')
}

exports.getAllEstatisticaByJogadorId = async (jogadorId) => {
    return await EstatisticaJogador.find({ jogadorId: jogadorId }, '-__v')
}

exports.getAllEstatisticas = async () => {
    return await EstatisticaJogador.find({ }, '-__v')
}

exports.getEstatisticaById = async (id) => {
    return await EstatisticaJogador.find({ _id: id }, '-__v')
}

exports.getEstatisticaJogadorByCampeonatoId = async (id) => {
    return await EstatisticaJogador.find({ campeonatoId: id }, '-__v').sort({ gols: "descending" })
}

exports.getAllEstatisticasJogadoresPunidos = async () => {
    return await EstatisticaJogador.find({ punicao: { $ne: null } })
}

exports.deleteEstatisticaById = async (id) => {
    return await EstatisticaJogador.deleteOne({ _id: id })
}

exports.deleteAllEstatisticaJogadorByJogadorId = async (jogadorId) => {
    return await EstatisticaJogador.deleteMany({ jogadorId: jogadorId })
}

exports.cleanDatabase = async () => {
    return await EstatisticaJogador.deleteMany({  })
}