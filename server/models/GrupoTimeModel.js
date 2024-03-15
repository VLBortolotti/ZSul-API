const mongoose = require('mongoose')
const database = require('../infra/database')

const GrupoTimeSchema = mongoose.Schema(
    {
        teamId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        teamName: {
            type: String,
            required: true
        },
        grupoId: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    }
)

module.exports = mongoose.model('GrupoTime', GrupoTimeSchema)