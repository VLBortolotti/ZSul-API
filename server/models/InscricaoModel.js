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
            default: 0
        },
        vitorias: {
            type: Number,
            default: 0
        },
        empates: {
            type: Number,
            default: 0
        },
        derrotas: {
            type: Number,
            default: 0
        },
        golsFeitos: {
            type: Number,
            default: 0
        },
        golsSofridos: {
            type: Number,
            default: 0
        },
        saldoGols: {
            type: Number,
            default: 0
        },
        pontos: {
            type: Number,
            default: 0
        }
    }
)

module.exports = mongoose.model('Inscricao', inscricaoSchema)