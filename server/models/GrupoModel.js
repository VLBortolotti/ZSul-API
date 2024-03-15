const mongoose = require('mongoose')
const database = require('../infra/database')

const grupoSchema = mongoose.Schema(
    { 
        name: {
            type: String,
            required: true
        },
        campeonatoId: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    }
);

module.exports = mongoose.model('Grupo', grupoSchema)