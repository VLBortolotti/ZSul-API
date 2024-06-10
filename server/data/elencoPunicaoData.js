const ElencoPunicao = require('../models/ElencoPunicaoModel')

exports.postPunicao = async (teamId, teamName, campeonatoId, campeonatoName, elencoId, elencoName, punicao, descricao) => {
    const elencoPunicao = new ElencoPunicao({
        teamId, teamName, campeonatoId, campeonatoName, elencoId, elencoName, punicao, descricao
    })

    return await elencoPunicao.save()
}

exports.getAllPunicao = async () => {
    return await ElencoPunicao.find({ }, '-__v')
}

exports.getPunicaoById = async (id) => {
    return await ElencoPunicao.findOne({ _id: id }, '-__v')
}

exports.getPunicaoByTeamId = async (teamId) => {
    return await ElencoPunicao.find({ teamId: teamId }, '-__v')
}

exports.getPunicaoByCampeonatoId = async (campeonatoId) => {
    return await ElencoPunicao.find({ campeonatoId: campeonatoId }, '-__v')
}

exports.deleteAthleteById = async (id) => {
    return await ElencoPunicao.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return await ElencoPunicao.deleteMany({ })
}