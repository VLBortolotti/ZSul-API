const Elenco = require('../models/ElencoModel')

exports.postAthlete = async (teamId, name, dateOfBirth, RG, CPF, school, category, RGFrente, RGVerso, fotoAtleta) => {
    const elenco = new Elenco({ teamId, name, dateOfBirth, RG, CPF, school, category })

    return await elenco.save()
}

exports.getAllAthletes = async () => {
    return await Elenco.find({ }, '-__v -password')
}

exports.getAthleteById = async (id) => {
    return await Elenco.findOne({ _id: id }, '-__v')
}

exports.getAthletesByTeamId = async (id) => {
    return await Elenco.find({ teamId: id }, '-__v -password')
}

exports.deleteAthleteById = async (id) => {
    return await Elenco.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return await Elenco.deleteMany({ })
}