const mongoose = require('mongoose')
const database = require('../infra/database')

const elencoPunicaoSchema = mongoose.Schema(
    { 
        teamId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        teamName: {
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
        elencoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        elencoName: {
            type: String,
            required: true
        },
        punicao: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            default: ''
        }
    }
);

module.exports = mongoose.model('ElencoPunicao', elencoPunicaoSchema)