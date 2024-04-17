const mongoose = require('mongoose')
const database = require('../infra/database')

const fotografoSchema = mongoose.Schema(
    { 
        titulo: {
            type: String,
            required: true
        }, 
        foto: {
            type: String,
            required: true
        },
        nome: {
            type: String,
            required: true
        },
        instagram: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Fotografo', fotografoSchema)