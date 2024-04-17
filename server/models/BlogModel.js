const mongoose = require('mongoose')
const database = require('../infra/database')

const blogSchema = mongoose.Schema(
    { 
        titulo: {
            type: String,
            required: true
        }, 
        subtitulo: {
            type: String,
            required: true
        },
        texto: {
            type: String,
            required: true
        },
        imagem: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Blog', blogSchema)