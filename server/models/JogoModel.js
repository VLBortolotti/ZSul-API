const mongoose = require('mongoose')
const database = require('../infra/database')

const jogoSchema = mongoose.Schema(
    { 
        campeonatoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        campeonatoName: {
            type: String,
            required: true
        },
        userIdCasa: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        userCasaName: {
            type: String,
            required: true
        },
        userIdFora: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        userForaName: {
            type: String,
            required: true
        },
        grupoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        data: {
            type: String,
            required: true
        },
        campoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        hora: {
            type: String,
            required: true
        },
    }
);

module.exports = mongoose.model('Jogo', jogoSchema)