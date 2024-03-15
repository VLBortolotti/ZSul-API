const Jogo = require('../models/JogoModel')

exports.postJogo = async (campeonatoId, campeonatoName, userIdCasa, userCasaName, userIdFora, userForaName, grupoId, tipo, data, hora, local) => {
    const jogo = new Jogo({ campeonatoId, campeonatoName, userIdCasa, userCasaName, userIdFora, userForaName, grupoId, tipo, data, hora, local })

    return jogo.save()
}

exports.getAllJogos = async () => {
    return await Jogo.find({ }, '-__v')
}

exports.getJogoById = async (id) => {
    return await Jogo.findOne({ _id: id }, '-__v')
}

exports.getJogoCampeonatoById = async (campeonatoId) => {
    return await Jogo.find({ campeonatoId: campeonatoId }, '-__v')
}

exports.getJogoTeamById = async (userId) => {
    return await Jogo.find({
        $or: [
            { userIdCasa: userId },
            { userIdFora: userId }
        ]
    })
}

exports.getJogoGrupoById = async (grupoId) => {
    return await Jogo.find({ grupoId: grupoId }, '-__v')
}

exports.deleteJogoById = async (id) => {
    return await Jogo.deleteOne({ _id: id }, '-__v')
}

exports.cleanDatabase = async () => {
    return await Jogo.deleteMany({ })
}