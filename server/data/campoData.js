const Campo = require('../models/CampoModel')

exports.postCampo = async (nome, cidade, endereco, linkMaps, fileName, fileType, fileBase64) => {
    const campo = new Campo({ nome, cidade, endereco, linkMaps, fileName, fileType, fileBase64 })

    return await campo.save()
}

exports.getAllCampos = async () => {
    return await Campo.find({ }, '-__v')
}

exports.getCampoByCidade = async (cidade) => {
    return await Campo.find({ cidade: cidade }, '-__v')
}

exports.getCampoByNome = async (nome) => {
    return await Campo.find({ nome: nome }, '-__v')
}

exports.getCampoByEndereco = async (endereco) => {
    return await Campo.find({ endereco: endereco }, '-__v')
}

exports.getCampoById = async (id) => {
    return await Campo.findOne({ _id: id }, '-__v')
}

exports.deleteCampoById = async (id) => {
    return await Campo.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return await Campo.deleteMany({ })
}