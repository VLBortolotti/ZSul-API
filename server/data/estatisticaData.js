const EstatisticaJogo = require('../models/EstatisticaJogoModel')

exports.postEstatistica = async (campeonatoId, jogoId, vencedor, userCasaId, userCasaNome, userCasaGols, userForaId, userForaNome, userForaGols) => {
    const estatisticaJogo = new EstatisticaJogo({
        campeonatoId, jogoId, vencedor, userCasaId, userCasaNome, userCasaGols, userForaId, userForaNome, userForaGols
    }) 

    return await estatisticaJogo.save()
}

exports.getEstatisticaJogoById = async (id) => {
    return await EstatisticaJogo.findOne({ jogoId: id }, '-__v')
}

exports.getEstatisticaById = async (id) => {
    return await EstatisticaJogo.find({ _id: id }, '-__v')
}

exports.getAllEstatisticas = async () => {
    return await EstatisticaJogo.find({ }, '-__v')
}

exports.getEstatisticaTeamById = async (campeonatoId, teamId) => {
    return await EstatisticaJogo.find({ 
        campeonatoId: campeonatoId,
        $or: [
            { userCasaId: teamId },
            { userForaId: teamId }
        ]
    })
}

exports.deleteEstatisticaById = async (id) => {
    return await EstatisticaJogo.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return await EstatisticaJogo.deleteMany({ })
}