const Inscricao = require('../models/InscricaoModel')

exports.postInscricao = async (userId, userName, campeonatoId, campeonatoName) => {
    const inscricao = new Inscricao({ 
        userId: userId, 
        userName: userName, 
        campeonatoId: campeonatoId, 
        campeonatoName: campeonatoName 
    })

    return await inscricao.save()
}

exports.getAllInscricoes = async () => {
    return await Inscricao.find({ }, '-__v')
}

exports.getInscricaoById = async (id) => {
    return await Inscricao.findOne({ _id: id }, '-__v')
}

exports.getInscricoesByUserId = async (userId) => {
    return await Inscricao.findOne({ userId: userId })
}

exports.getInscricoesByCampeonatoId = async (campeonatoId) => {
    return await Inscricao.find({ campeonatoId: campeonatoId }, '-__v')
}

exports.getInscricaoByUserIdAndCampeonatoId = async (userId, campeonatoId) => {
    return await Inscricao.findOne({ 
        userId: userId, 
        campeonatoId: campeonatoId 
    }, '-__v')
}

exports.deleteInscricaoById = async (id) => {
    return await Inscricao.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return await Inscricao.deleteMany({ })
}