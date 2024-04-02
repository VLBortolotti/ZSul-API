const SumulaPermissao = require('../models/SumulaPermissaoModel')

exports.postSumulaPermissao = async (campeonatoId, campeonatoCategoria, campeonatoName, userId, userName, elencoId, elencoCategoria, elencoName, elencoDocumento, status) => {
    const sumulaPermissao = new SumulaPermissao({ campeonatoId, campeonatoCategoria, campeonatoName, userId, userName, elencoId, elencoCategoria, elencoName, elencoDocumento, status })

    return sumulaPermissao.save()
}

exports.getAllSumulasPermissao = async () => {
    return SumulaPermissao.find({  }, '-__v')
}

exports.getSumulaPermissaoById = async (id) => {
    return SumulaPermissao.findOne({ _id: id }, '-__v')
}

exports.deletarSumulaPermissaoById = async (id) => {
    return SumulaPermissao.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return SumulaPermissao.deleteMany({  })
}