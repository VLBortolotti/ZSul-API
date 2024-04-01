const Campeonato = require('../models/CampeonatoModel')

exports.postCampeonato = async (name, categoria, participantes, vagas, quantidadeGrupos, dataInicio, cidade, tipoCompeticao, pictureBase64) => {
    const campeonato = new Campeonato({ name, categoria, participantes, vagas, quantidadeGrupos, dataInicio, cidade, tipoCompeticao, pictureBase64 })

    return await campeonato.save()
}

exports.getAllCampeonatos = async () => {
    return await Campeonato.find({ }, '-__v')
}

exports.getCampeonatoById = async (id) => {
    return await Campeonato.findOne({ _id: id }, '-__v')
}

exports.getCampeonatoByName = async (name) => {
    return await Campeonato.findOne({ name: name }, '-__v')
}

exports.deleteCampeonatoById = async (id) => {
    return await Campeonato.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return await Campeonato.deleteMany({ })
}