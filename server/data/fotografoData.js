const Fotografo = require('../models/FotografoModel')

exports.postFotografo = async (titulo, foto, nome, instagram) => {
    const fotografo = new Fotografo({ titulo, foto, nome, instagram })

    return await fotografo.save()
}

exports.getAllFotografos = async () => {
    return await Fotografo.find({ }, '-__v')
}

exports.getFotografoById = async (id) => {
    return await Fotografo.findOne({ _id: id }, '-__v')
}

exports.getFotografoByNome = async (nome) => {
    return await Fotografo.find({ nome: nome }, '-__v')
}

exports.deleteFotografoById = async (id) => {
    return await Fotografo.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return await Fotografo.deleteMany({  })
}