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
        },
        // picture: {
        //     type: String, // path
        //     default: null
        // },
        pictureBase64: {
            type: String,
            default: null
        }
    }
);

module.exports = mongoose.model('User', userSchema)