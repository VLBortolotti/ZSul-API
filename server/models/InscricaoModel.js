const mongoose = require('mongoose')
const database = require('../infra/database')

const inscricaoSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        campeonatoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        campeonatoName: {
            type: String,
            required: true
        },
        numeroJogos : {
            type: Number,
            default: null
        },
        vitorias: {
            type: Number,
            default: null
        },
        empates: {
            type: Number,
            default: null
        },
        derrotas: {
            type: Number,
            default: null
        },
        golsFeitos: {
            type: Number,
            default: null
        },
        golsSofridos: {
            type: Number,
            default: null
        },
        saldoGols: {
            type: Number,
            default: null
        },
        pontos: {
            type: Number,
            default: null
        }
    }
)

module.exports = mongoose.model('Inscricao', inscricaoSchema)