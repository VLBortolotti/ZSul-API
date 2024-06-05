const EstatisticaJogadorCampeonato = require('../models/EstatisticaJogadorCampeonatoModel')

exports.postEstatisticaJogadorCampeonato = async (campeonatoId, campeonatoName, teamId, teamName, jogadorId, jogadorName, gols, numeroCartoesAmarelo, numeroCartoesVermelho, punicao) => {
    const estatisticaJogadorCampeonato = new EstatisticaJogadorCampeonato({
        campeonatoId, campeonatoName, teamId, teamName, jogadorId, jogadorName, gols, numeroCartoesAmarelo, numeroCartoesVermelho, punicao
    })

    return await estatisticaJogadorCampeonato.save()
}

exports.getAllEstatisticaJogadorCampeonato = async () => {
    return await EstatisticaJogadorCampeonato.find({ }, '-__v')
}

exports.getEstatisticaJogadorCampeonatoById = async (id) => {
    return await EstatisticaJogadorCampeonato.findOne({ _id: id }, '-__v')
}

exports.getEstatisticaJogadorCampeonatoByTeamId = async (teamId, campeonatoId) => {
    return await EstatisticaJogadorCampeonato.find({ teamId: teamId, campeonatoId: campeonatoId }, '-__v')
}

exports.getEstatisticaJogadorCampeonatoByCampeonatoId = async (campeonatoId) => {
    return await EstatisticaJogadorCampeonato.find({ campeonatoId: campeonatoId }, '-__v')
}

exports.getEstatisticaJogadorCampeonatoByCampeonatoIdAndJogadorId = async (campeonatoId, jogadorId) => {
    return await EstatisticaJogadorCampeonato.findOne({ campeonatoId: campeonatoId, jogadorId: jogadorId }, '-__v')
}

exports.getEstatisticaJogadorCampeonatoByJogadorId = async (jogadorId) => {
    return await EstatisticaJogadorCampeonato.findOne({ jogadorId: jogadorId }, '-__v')
}

exports.getAllEstatisticasJogadoresPunidos = async () => {
    return await EstatisticaJogadorCampeonato.find({ punicao: { $ne: null } })
}

exports.deleteEstatisticaJogadorCampeonatoById = async (id) => {
    return await EstatisticaJogadorCampeonato.deleteOne({ _id: id })
}

exports.deleteEstatisticaJogadorCampeonatoByCampeonatoId = async (campeonatoId) => {
    return await EstatisticaJogadorCampeonato.deleteOne({ campeonatoId: campeonatoId })
}

exports.cleanDatabase = async () => {
    return await EstatisticaJogadorCampeonato.deleteMany({  })
}