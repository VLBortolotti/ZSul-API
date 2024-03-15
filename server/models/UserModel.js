const mongoose = require('mongoose')
const database = require('../infra/database')

const userSchema = mongoose.Schema(
    { 
        teamName: {
            type: String,
            required: true
        }, 
        email: {
            type: String,
            required: true 
        },
        password: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        permission: {
            type: String,
            required: true,
            default: "TEquipe"
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
        },
        picture: {
            type: String, // path
            default: null
        },
        pictureBase64: {
            type: String,
            default: null
        }
    }
);

module.exports = mongoose.model('User', userSchema)