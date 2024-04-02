const mongoose = require('mongoose')
const database = require('../infra/database')

const campeonatoSchema = mongoose.Schema(
    { 
        name: {
            type: String,
            required: true
        },
        categoria: {
            type: String,
            required: true
        }, 
        participantes: { // colocar apenas o numero de participantes
            type: Number,
            required: false,
            default: 0
        },
        vagas: {
            type: Number,
            required: true
        },
        quantidadeGrupos: {
            type: Number,
            required: true
        },
        dataInicio: {
            type: String,
            required: true,
        }, 
        cidade: {
            type: String, 
            required: true
        },
        tipoCompeticao: {
            type: String,
            required: true
        },
        // tipoGrupo: {
        //     type: String,
        //     required: true
        // },
        // tipoMataMata: {
        //     type: String, 
        //     required: true
        // },
        // pictureName: {  
        //     type: String, 
        //     default: null
        // },
        pictureBase64: { 
            type: String, 
            default: null
        },
        status: {
            type: String,
            default: "aberto"
        }
    }
);

module.exports = mongoose.model('Campeonato', campeonatoSchema)